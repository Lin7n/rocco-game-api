const crypto = require('crypto');
const config = require('../config');
const { UnauthorizedError } = require('../shared/errors');

// 时间戳允许的偏差（5 分钟）
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000;
// 已用过的 nonce 缓存（防重放），按 apiKey 隔离，5 分钟清理一次
const nonceCache = new Map();
let lastCleanup = Date.now();

function cleanupNonces() {
  const now = Date.now();
  if (now - lastCleanup < 60 * 1000) return;
  lastCleanup = now;
  for (const [key, timestamps] of nonceCache.entries()) {
    const valid = timestamps.filter((t) => now - t < TIMESTAMP_TOLERANCE_MS);
    if (valid.length === 0) nonceCache.delete(key);
    else nonceCache.set(key, valid);
  }
}

/**
 * HMAC 签名校验 + API Key 校验 + 时间戳防重放
 *
 * 客户端请求头：
 *   X-API-Key:    双方约定的 key
 *   X-Timestamp:  毫秒级时间戳
 *   X-Nonce:      16 字节随机字符串
 *   X-Signature:  hex(HMAC-SHA256(apiKey + '\n' + timestamp + '\n' + nonce + '\n' + method + '\n' + path))
 *
 * 安全特性：
 *   1. 不知道 apiKey 算不出签名 → 攻击者拿到 URL 也调不动
 *   2. 时间戳偏差 5 分钟 → 抓包重放也过不了
 *   3. nonce 一次性 → 同一请求不能重发
 *   4. 包含 method+path → 不能用 GET 的签名去调 POST
 */
function authenticate(req, res, next) {
  cleanupNonces();

  const apiKey = req.headers['x-api-key'];
  const timestamp = req.headers['x-timestamp'];
  const nonce = req.headers['x-nonce'];
  const signature = req.headers['x-signature'];

  if (!apiKey || !timestamp || !nonce || !signature) {
    return next(new UnauthorizedError('缺少鉴权头 (X-API-Key / X-Timestamp / X-Nonce / X-Signature)'));
  }

  if (!config.auth.apiKeys.includes(apiKey)) {
    return next(new UnauthorizedError('无效的 API Key'));
  }

  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Math.abs(Date.now() - ts) > TIMESTAMP_TOLERANCE_MS) {
    return next(new UnauthorizedError('请求时间戳无效或已过期（5分钟）'));
  }

  // nonce 防重放
  const cacheKey = `${apiKey}:${nonce}`;
  const bucket = nonceCache.get(apiKey) || [];
  if (bucket.includes(ts)) {
    return next(new UnauthorizedError('请求已过期（请刷新重试）'));
  }
  bucket.push(ts);
  if (bucket.length > 200) bucket.shift();
  nonceCache.set(apiKey, bucket);

  // 签名校验
  const path = req.originalUrl.split('?')[0]; // 路径不含 query
  const payload = [apiKey, timestamp, nonce, req.method.toUpperCase(), path].join('\n');
  const expected = crypto
    .createHmac('sha256', apiKey)
    .update(payload)
    .digest('hex');

  if (expected.length !== signature.length ||
      !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return next(new UnauthorizedError('签名校验失败'));
  }

  req.clientId = apiKey;
  next();
}

module.exports = authenticate;
