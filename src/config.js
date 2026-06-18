const path = require('path');

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`缺少必需环境变量: ${name}`);
  return value;
}

function intEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const num = parseInt(raw, 10);
  if (isNaN(num)) throw new Error(`环境变量 ${name} 必须是整数，收到: ${raw}`);
  return num;
}

const config = {
  port: intEnv('PORT', 3001),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, '..', 'data', 'game-tool.db'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds'),
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.pragma('journal_mode = WAL');
        conn.pragma('foreign_keys = ON');
        cb();
      },
    },
  },

  auth: {
    apiKeys: (process.env.API_KEYS || 'dev-key-please-change')
      .split(',')
      .map(k => k.trim()),
  },

  cors: {
    origins: (process.env.CORS_ORIGINS || '*').split(',').map(o => o.trim()),
  },

  rateLimit: {
    windowMs: intEnv('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    max: intEnv('RATE_LIMIT_MAX', 100),
  },
};

module.exports = config;
