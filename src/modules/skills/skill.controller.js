/**
 * 技能相关 API Controller
 */
const { SKILLS, searchSkills } = require('../../data/skills');
const { sendSuccess, sendPaginated } = require('../../utils/response');

/**
 * GET /api/v1/skills
 * 技能列表（支持搜索、筛选、分页）
 * Query: keyword, type, category, energyMax, powerMin, page, pageSize
 */
function list(req, res) {
  const { keyword, type, category, energyMax, powerMin, page, pageSize } = req.query;
  const result = searchSkills({
    keyword,
    type,
    category,
    energyMax: energyMax != null ? Number(energyMax) : undefined,
    powerMin: powerMin != null ? Number(powerMin) : undefined,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
  });
  return sendPaginated(res, result);
}

/**
 * GET /api/v1/skills/categories
 * 技能分类（按系别+类别）
 */
function categories(req, res) {
  const byType = {};
  const byCategory = {};
  SKILLS.forEach((s) => {
    if (!byType[s.type]) byType[s.type] = [];
    byType[s.type].push({ id: s.id, name: s.name, power: s.power, energy: s.energy });
    if (!byCategory[s.category]) byCategory[s.category] = 0;
    byCategory[s.category]++;
  });
  return sendSuccess(res, { byType, byCategory });
}

/**
 * GET /api/v1/skills/:id
 * 技能详情
 */
function detail(req, res) {
  const skill = SKILLS.find((s) => s.id === req.params.id);
  if (!skill) {
    return res.status(404).json({ code: 404, message: 'Skill not found' });
  }
  return sendSuccess(res, skill);
}

module.exports = { list, categories, detail };
