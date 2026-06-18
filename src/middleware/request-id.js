const { v4: uuidv4 } = require('uuid');
const logger = require('../shared/logger');

function requestId(req, res, next) {
  const id = req.headers['x-request-id'] || uuidv4();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);

  const startTime = Date.now();
  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl}`, {
      requestId: id,
      statusCode: res.statusCode,
      durationMs: Date.now() - startTime,
      ip: req.ip,
    });
  });

  next();
}

module.exports = requestId;
