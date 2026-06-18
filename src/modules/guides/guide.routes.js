/**
 * 攻略路由
 */
const { Router } = require('express');
const ctrl = require('./guide.controller');

const router = Router();

router.get('/categories', ctrl.categories);
router.get('/:id', ctrl.detail);
router.get('/', ctrl.list);

module.exports = router;
