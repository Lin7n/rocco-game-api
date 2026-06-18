const { AppError, NotFoundError, ValidationError } = require('../shared/errors');
const logger = require('../shared/logger');

function errorHandler(err, req, res, _next) {
  const requestId = req.requestId || 'unknown';

  if (err instanceof AppError) {
    logger.warn('Operational error', {
      requestId,
      code: err.code,
      message: err.message,
      statusCode: err.statusCode,
    });

    const body = {
      error: {
        code: err.code,
        message: err.message,
      },
      requestId,
    };

    if (err instanceof ValidationError && err.errors) {
      body.error.details = err.errors;
    }

    return res.status(err.statusCode).json(body);
  }

  logger.error('Unexpected error', {
    requestId,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: '服务器内部错误',
    },
    requestId,
  });
}

module.exports = errorHandler;
