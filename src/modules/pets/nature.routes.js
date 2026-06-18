/**
 * 性格相关 API Routes
 */
const { Router } = require('express');
const ctrl = require('./nature.controller');

const router = Router();

router.get('/', ctrl.list);
router.get('/recommend', ctrl.recommend);
router.get('/:name', ctrl.detail);

module.exports = router;
