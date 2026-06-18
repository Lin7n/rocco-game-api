/**
 * 技能相关 API Routes
 */
const { Router } = require('express');
const ctrl = require('./skill.controller');

const router = Router();

router.get('/', ctrl.list);
router.get('/categories', ctrl.categories);
router.get('/:id', ctrl.detail);

module.exports = router;
