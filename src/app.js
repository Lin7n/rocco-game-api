const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const requestId = require('./middleware/request-id');
const errorHandler = require('./middleware/error-handler');
const logger = require('./shared/logger');
const authenticate = require('./middleware/auth');

const petRoutes = require('./modules/pets/pet.routes');
const natureRoutes = require('./modules/pets/nature.routes');
const skillRoutes = require('./modules/skills/skill.routes');
const teamRoutes = require('./modules/teams/team.routes');
const guideRoutes = require('./modules/guides/guide.routes');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: config.cors.origins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Timestamp', 'X-Nonce', 'X-Signature', 'X-Request-Id'],
  exposedHeaders: ['X-Request-Id'],
  maxAge: 86400,
}));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: '请求过于频繁，请稍后再试' } },
});

app.use(requestId);
app.use(express.json({ limit: '2mb' }));
app.use(limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/ready', (req, res) => {
  // 纯内存数据模式：始终就绪
  res.json({
    status: 'ok',
    database: 'not-required (in-memory mode)',
    pets: require('./data/pets').PETS.length,
    skills: require('./data/skills').SKILLS.length,
    natures: require('./data/natures').NATURES.length,
  });
});

app.use('/api/v1/auth', authRoutes);
// 业务接口全部走 HMAC 签名校验
app.use('/api/v1', authenticate);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/natures', natureRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/guides', guideRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `${req.method} ${req.path} 不存在` },
    requestId: req.requestId,
  });
});

app.use(errorHandler);

module.exports = app;
