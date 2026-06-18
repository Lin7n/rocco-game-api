/**
 * 精灵相关 API Controller
 */

const { PETS, getPetById, searchPets, listPets, getEvolutionChain } = require('../../data/pets');
const { TYPES } = require('../../data/type-chart');
const { sendSuccess, sendError, sendPaginated } = require('../../utils/response');

/**
 * GET /api/v1/pets/types
 * 获取18种属性列表
 */
function getTypes(req, res) {
  const types = TYPES.map((t) => ({
    code: t,
    name: t,
  }));
  return sendSuccess(res, { types });
}

/**
 * GET /api/v1/pets
 * 精灵列表（支持分页、筛选、排序、搜索）
 * Query: page, pageSize, type, keyword, sortBy (no/total/name)
 */
function list(req, res) {
  const { page, pageSize, type, keyword, sortBy } = req.query;

  let result;
  if (keyword) {
    result = searchPets(keyword);
    if (type) result = result.filter((p) => p.types.includes(type));
    // 搜索不分页
    return sendSuccess(res, {
      items: result,
      total: result.length,
      page: 1,
      pageSize: result.length,
    });
  }

  result = listPets({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    type,
    sortBy: sortBy || 'no',
  });

  return sendPaginated(res, result);
}

/**
 * GET /api/v1/pets/:id
 * 精灵详情
 */
function detail(req, res) {
  const pet = getPetById(req.params.id);
  if (!pet) {
    return sendError(res, 404, 'Pet not found');
  }
  return sendSuccess(res, pet);
}

/**
 * GET /api/v1/pets/:id/evolution
 * 进化链
 */
function evolution(req, res) {
  const chain = getEvolutionChain(req.params.id);
  if (!chain) {
    return sendError(res, 404, 'Pet not found');
  }
  return sendSuccess(res, { chain });
}

/**
 * POST /api/v1/pets/calc-stats
 * 能力值计算器（按公式：((种族值×2 + 天赋 + 努力/4) × 等级/100 + 10 + 等级) × 性格修正）
 * Body: { petId, level, nature, ivs: {hp,atk,def,spa,spd,spe}, evs: {...} }
 */
function calcStats(req, res) {
  const { petId, level = 50, nature = '开朗', ivs = {}, evs = {} } = req.body;
  const pet = getPetById(petId);
  if (!pet) {
    return sendError(res, 404, 'Pet not found');
  }
  if (level < 1 || level > 100) {
    return sendError(res, 400, 'Level must be 1-100');
  }

  const { getNatureMultiplier } = require('../../data/natures');
  const STATS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

  const result = {};
  STATS.forEach((stat) => {
    const base = pet.stats[stat];
    const iv = ivs[stat] ?? 31; // 满天赋
    const ev = evs[stat] ?? 0;
    // HP 公式: ((种族值×2 + 天赋 + 努力/4) × 等级/100) + 等级 + 10
    // 其他公式: ((种族值×2 + 天赋 + 努力/4) × 等级/100) + 5
    let value;
    if (stat === 'hp') {
      value = Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    } else {
      value = Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    }
    // 性格修正（HP不受性格影响）
    if (stat !== 'hp') {
      value = Math.floor(value * getNatureMultiplier(nature, stat));
    }
    result[stat] = value;
  });

  return sendSuccess(res, {
    pet: { id: pet.id, name: pet.name },
    level,
    nature,
    ivs,
    evs,
    stats: result,
  });
}

module.exports = {
  getTypes,
  list,
  detail,
  evolution,
  calcStats,
};
