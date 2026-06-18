const config = require('../config');

const levels = { error: 0, warn: 1, info: 2, debug: 3 };

const currentLevel = config.nodeEnv === 'production' ? levels.info : levels.debug;

function log(level, message, meta = {}) {
  if (levels[level] > currentLevel) return;

  const entry = {
    level,
    timestamp: new Date().toISOString(),
    message,
    env: config.nodeEnv,
    ...meta,
  };

  const output = JSON.stringify(entry);

  if (level === 'error') {
    process.stderr.write(output + '\n');
  } else {
    process.stdout.write(output + '\n');
  }
}

const logger = {
  error: (msg, meta) => log('error', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
  child: (extra) => ({
    error: (msg, meta) => logger.error(msg, { ...extra, ...meta }),
    warn: (msg, meta) => logger.warn(msg, { ...extra, ...meta }),
    info: (msg, meta) => logger.info(msg, { ...extra, ...meta }),
    debug: (msg, meta) => logger.debug(msg, { ...extra, ...meta }),
  }),
};

module.exports = logger;
