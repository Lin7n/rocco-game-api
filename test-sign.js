// 测试后端签名校验：Node.js 实现（与后端中间件一致）
const crypto = require('crypto');

const apiKey = 'rocco-game-2026-secret-key';
const timestamp = Date.now().toString();
const nonce = 'test-nonce-12345';
const method = 'GET';
const path = '/pets';

const payload = [apiKey, timestamp, nonce, method.toUpperCase(), path].join('\n');
const signature = crypto
  .createHmac('sha256', apiKey)
  .update(payload)
  .digest('hex');

console.log('curl 测试命令:');
console.log(`curl -X GET "https://rocco-game-api.onrender.com/api/v1/pets?pageSize=1" \\`);
console.log(`  -H "X-API-Key: ${apiKey}" \\`);
console.log(`  -H "X-Timestamp: ${timestamp}" \\`);
console.log(`  -H "X-Nonce: ${nonce}" \\`);
console.log(`  -H "X-Signature: ${signature}"`);
console.log('');
console.log('payload:');
console.log(JSON.stringify({ apiKey, timestamp, nonce, method, path, signature, payload }));
