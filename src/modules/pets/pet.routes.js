/**
 * 精灵相关 API Routes
 */
const { Router } = require('express');
const ctrl = require('./pet.controller');

const router = Router();

router.get('/types', ctrl.getTypes);
router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);
router.get('/:id/evolution', ctrl.evolution);
router.post('/calc-stats', ctrl.calcStats);

module.exports = router;
