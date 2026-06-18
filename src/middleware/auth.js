const config = require('../config');
const { UnauthorizedError } = require('../shared/errors');

function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return next(new UnauthorizedError('缺少 API Key'));
  }

  if (!config.auth.apiKeys.includes(apiKey)) {
    return next(new UnauthorizedError('无效的 API Key'));
  }

  req.clientId = apiKey;
  next();
}

module.exports = authenticate;
