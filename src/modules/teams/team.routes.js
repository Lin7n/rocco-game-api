/**
 * 阵容评分 API Routes
 */
const { Router } = require('express');
const ctrl = require('./team.controller');

const router = Router();

router.post('/score', ctrl.score);
router.post('/counter', ctrl.recommendCounter);

module.exports = router;
