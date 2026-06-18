const express = require('express');
const crypto = require('crypto');
const config = require('../../config');
const { sendSuccess } = require('../../utils/response');

const router = express.Router();

router.get('/verify', (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey || !config.auth.apiKeys.includes(apiKey)) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: '无效的 API Key' },
    });
  }

  sendSuccess(res, { valid: true, message: '认证成功' });
});

/**
 * 后端预生成签名（解决微信小程序无 crypto API 的问题）
 *
 * 客户端调用：GET /api/v1/auth/sign?path=/api/v1/pets&method=GET
 * 返回：{ apiKey, timestamp, nonce, signature }
 *
 * 客户端再用这 4 个字段作请求头调真实 API
 */
router.get('/sign', (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const path = req.query.path;
  const method = (req.query.method || 'GET').toUpperCase();

  if (!apiKey || !config.auth.apiKeys.includes(apiKey)) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: '无效的 API Key' },
    });
  }

  if (!path) {
    return res.status(400).json({
      error: { code: 'BAD_REQUEST', message: '缺少 path 参数' },
    });
  }

  // 必须包含 /api/v1 前缀（与中间件 auth.js 里 req.originalUrl 一致）
  const fullPath = path.startsWith('/api/v1/') ? path : `/api/v1${path.startsWith('/') ? '' : '/'}${path}`;

  // 复用后端中间件同样的签名算法（保证一致性）
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(8).toString('hex');
  const payload = [apiKey, timestamp, nonce, method, fullPath].join('\n');
  const signature = crypto.createHmac('sha256', apiKey).update(payload).digest('hex');

  sendSuccess(res, {
    apiKey,
    timestamp,
    nonce,
    signature,
    method,
    path: fullPath,
  });
});

router.post('/generate-key', (req, res) => {
  const key = 'gk-' + crypto.randomBytes(16).toString('hex');
  sendSuccess(res, { apiKey: key, message: '请将此 Key 加入环境变量 API_KEYS' });
});

module.exports = router;
