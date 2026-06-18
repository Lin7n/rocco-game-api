/**
 * 性格相关 API Controller
 */
const { NATURES, getNatureMultiplier, RECOMMENDED_NATURES } = require('../../data/natures');
const { sendSuccess } = require('../../utils/response');

/**
 * GET /api/v1/natures
 * 获取所有30种性格
 */
function list(req, res) {
  return sendSuccess(res, { natures: NATURES, total: NATURES.length });
}

/**
 * GET /api/v1/natures/recommend
 * 推荐性格（按物攻/魔攻/坦克/速度分类）
 */
function recommend(req, res) {
  return sendSuccess(res, RECOMMENDED_NATURES);
}

/**
 * GET /api/v1/natures/:name
 * 性格详情
 */
function detail(req, res) {
  const nature = NATURES.find((n) => n.name === req.params.name);
  if (!nature) {
    return res.status(404).json({ code: 404, message: 'Nature not found' });
  }
  return sendSuccess(res, nature);
}

module.exports = { list, recommend, detail };
