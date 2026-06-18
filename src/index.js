const app = require('./app');
const config = require('./config');
const logger = require('./shared/logger');

const server = app.listen(config.port, () => {
  logger.info(`服务器已启动`, { port: config.port, env: config.nodeEnv });
  logger.info(`API 文档: http://localhost:${config.port}/api/v1`);
  logger.info(`健康检查: http://localhost:${config.port}/health`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('未处理的 Promise 拒绝', { reason: reason?.message || reason, stack: reason?.stack });
});

process.on('uncaughtException', (err) => {
  logger.error('未捕获的异常', { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('收到 SIGTERM，优雅关闭中...');
  server.close(() => {
    logger.info('HTTP 服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('收到 SIGINT，优雅关闭中...');
  server.close(() => {
    process.exit(0);
  });
});
