// 测试 HMAC 签名 - 验证前后端签名算法一致
const crypto = require('crypto');
const https = require('https');

const API_KEY = 'rocco-game-2026-secret-key';
const BASE_URL = 'rocco-game-api.onrender.com';

// 生成签名
function sign(method, path, body = '') {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(8).toString('hex');
  const stringToSign = `${method}\n${path}\n${timestamp}\n${nonce}\n${body}`;
  const signature = crypto.createHmac('sha256', API_KEY).update(stringToSign).digest('hex');
  return { timestamp, nonce, signature, stringToSign };
}

// 发起请求
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const { timestamp, nonce, signature, stringToSign } = sign(method, path, body ? JSON.stringify(body) : '');
    const url = `/api/v1${path}`;

    const options = {
      hostname: BASE_URL,
      port: 443,
      path: url,
      method: method,
      headers: {
        'X-API-Key': API_KEY,
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'X-Signature': signature,
        'Content-Type': 'application/json',
      },
    };

    console.log(`\n[请求] ${method} ${url}`);
    console.log(`[签名字符串] ${JSON.stringify(stringToSign)}`);
    console.log(`[签名] ${signature.substring(0, 32)}...`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[状态] ${res.statusCode}`);
        try {
          const json = JSON.parse(data);
          console.log(`[响应] ${JSON.stringify(json).substring(0, 200)}...`);
          resolve({ status: res.statusCode, data: json });
        } catch {
          console.log(`[响应] ${data.substring(0, 200)}`);
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  console.log('=== 1. 测试不带签名（期望 401）===');
  await new Promise((resolve) => {
    https.get(`https://${BASE_URL}/api/v1/pets?pageSize=1`, (res) => {
      console.log(`[状态] ${res.statusCode}（应该是 401）`);
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log(`[响应] ${data.substring(0, 150)}`);
        resolve();
      });
    });
  });

  console.log('\n=== 2. 测试带签名 - 精灵列表 ===');
  const r1 = await request('GET', '/pets?pageSize=2');
  console.log(r1.status === 200 ? '✅ 签名验证通过！' : '❌ 签名失败');

  console.log('\n=== 3. 测试带签名 - 性格推荐 ===');
  const r2 = await request('GET', '/natures?attackType=physical');
  console.log(r2.status === 200 ? '✅ 性格 API 正常' : '❌ 失败');

  console.log('\n=== 4. 测试带签名 - 属性克制 ===');
  const r3 = await request('GET', '/pets/types');
  console.log(r3.status === 200 ? '✅ 属性克制 API 正常' : '❌ 失败');

  console.log('\n=== 5. 测试带签名 - 精灵详情（迪莫）===');
  const r4 = await request('GET', '/pets/demo');
  console.log(r4.status === 200 ? '✅ 精灵详情 API 正常' : '❌ 失败');
  if (r4.data.data) {
    console.log(`[迪莫数据] 名称: ${r4.data.data.name}, 属性: ${r4.data.data.types?.join('+') || 'N/A'}`);
  }
})();
