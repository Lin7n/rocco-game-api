/**
 * 模拟前端 request.js 完整流程
 * 1. 先 GET /auth/sign 拿后端预生成的签名
 * 2. 再带签名 GET 真实 API
 */
const https = require('https');

const BASE = 'https://rocco-game-api.onrender.com/api/v1';
const API_KEY = 'rocco-game-2026-secret-key';

function httpGet(path, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(BASE + path, { headers }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    }).on('error', reject);
  });
}

async function testEndpoint(label, realPath, realMethod = 'GET') {
  console.log(`\n=== ${label} ===`);

  // 1) 先去拿签名（仅 path 部分，不含 query）
  const signPath = realPath.split('?')[0];
  const signRes = await httpGet(`/auth/sign?path=${encodeURIComponent(signPath)}&method=${realMethod}`, {
    'X-API-Key': API_KEY,
  });
  if (signRes.status !== 200) {
    console.log(`[签名] ${signRes.status}`, signRes.data);
    return;
  }
  const { apiKey, timestamp, nonce, signature } = signRes.data.data;
  console.log(`[签名OK] nonce=${nonce.substring(0, 8)}... sig=${signature.substring(0, 16)}...`);

  // 2) 用签名调真实 API
  const realRes = await httpGet(realPath, {
    'X-API-Key': apiKey,
    'X-Timestamp': timestamp,
    'X-Nonce': nonce,
    'X-Signature': signature,
  });
  if (realRes.status === 200) {
    const d = realRes.data.data;
    if (Array.isArray(d)) {
      console.log(`[OK] ${realRes.status}  返回 ${d.length} 项`, d.slice(0, 1));
    } else if (d && typeof d === 'object') {
      console.log(`[OK] ${realRes.status}  1 项`, Object.keys(d).slice(0, 5));
    } else {
      console.log(`[OK] ${realRes.status}`, d);
    }
  } else {
    console.log(`[FAIL] ${realRes.status}`, realRes.data);
  }
}

(async () => {
  await testEndpoint('1. 精灵列表', '/pets?pageSize=2');
  await testEndpoint('2. 精灵详情 - 迪莫', '/pets/demo');
  await testEndpoint('3. 属性克制表', '/pets/types');
  await testEndpoint('4. 技能列表', '/skills?pageSize=2');
  await testEndpoint('5. 性格列表', '/natures?pageSize=2');
})();
