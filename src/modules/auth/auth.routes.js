const express = require('express');
const crypto = require('crypto');
const config = require('../../config');
const { success } = require('../../utils/response');

const router = express.Router();

router.get('/verify', (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey || !config.auth.apiKeys.includes(apiKey)) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: '无效的 API Key' },
    });
  }

  success(res, { valid: true, message: '认证成功' });
});

router.post('/generate-key', (req, res) => {
  const key = 'gk-' + crypto.randomBytes(16).toString('hex');
  success(res, { apiKey: key, message: '请将此 Key 加入环境变量 API_KEYS' });
});

module.exports = router;
