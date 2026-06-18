// 对照测试：后端 Node crypto vs 前端纯 JS 实现
const crypto = require('crypto');

// 复刻前端 hmacSha256Hex 纯 JS 实现
function rotr(x, n) { return ((x >>> n) | (x << (32 - n))) | 0; }

function sha256(message) {
  const utf8 = unescape(encodeURIComponent(message));
  const bytes = new Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) bytes[i] = utf8.charCodeAt(i);

  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const ml = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i--) bytes.push((ml >>> (i * 8)) & 0xff);

  for (let i = 0; i < bytes.length; i += 64) {
    const W = new Array(64);
    for (let j = 0; j < 16; j++) {
      W[j] = (bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3];
    }
    for (let j = 16; j < 64; j++) {
      const s0 = rotr(W[j - 15], 7) ^ rotr(W[j - 15], 18) ^ (W[j - 15] >>> 3);
      const s1 = rotr(W[j - 2], 17) ^ rotr(W[j - 2], 19) ^ (W[j - 2] >>> 10);
      W[j] = (W[j - 16] + s0 + W[j - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let j = 0; j < 64; j++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K[j] + W[j]) | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const mj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + mj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0;
      d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0; H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0;
    H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
  }
  return H.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
  return bytes;
}

function hmacSha256Hex(key, message) {
  let keyBytes = [];
  const keyUtf8 = unescape(encodeURIComponent(key));
  for (let i = 0; i < keyUtf8.length; i++) keyBytes.push(keyUtf8.charCodeAt(i));
  if (keyBytes.length > 64) {
    const hashed = hexToBytes(sha256(key));
    keyBytes = hashed;
  }
  while (keyBytes.length < 64) keyBytes.push(0);
  const inner = keyBytes.map((b) => b ^ 0x36);
  const outer = keyBytes.map((b) => b ^ 0x5c);
  const innerStr = String.fromCharCode.apply(null, inner) + message;
  const outerStr = String.fromCharCode.apply(null, outer) + sha256(innerStr);
  return sha256(outerStr);
}

// 测试数据
const apiKey = 'rocco-game-2026-secret-key';
const timestamp = '1781767752436';
const nonce = 'ded2474d709739e3';
const method = 'GET';
const path = '/api/v1/pets';
const payload = [apiKey, timestamp, nonce, method, path].join('\n');

console.log('=== 签名字符串 ===');
console.log(JSON.stringify(payload));
console.log('');

// 后端 Node crypto
const nodeSig = crypto.createHmac('sha256', apiKey).update(payload).digest('hex');
console.log('=== 后端 Node crypto 签名 ===');
console.log(nodeSig);

// 前端纯 JS
const jsSig = hmacSha256Hex(apiKey, payload);
console.log('=== 前端纯 JS 签名 ===');
console.log(jsSig);

console.log('');
console.log('=== 对比 ===');
console.log('相同?', nodeSig === jsSig ? '✅ 一样' : '❌ 不一样');
