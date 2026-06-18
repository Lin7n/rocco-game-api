class AppError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', statusCode = 500, isOperational = true) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} 未找到: ${id}`, 'NOT_FOUND', 404);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('请求参数校验失败', 'VALIDATION_ERROR', 422);
    this.errors = errors;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = '未授权访问') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 'CONFLICT', 409);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ConflictError,
};
