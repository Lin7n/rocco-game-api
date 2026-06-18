/**
 * 阵容评分 API Controller
 */
const { scoreTeamByIds } = require('./team.service');
const { sendSuccess, sendError } = require('../../utils/response');
const { PETS } = require('../../data/pets');

/**
 * POST /api/v1/teams/score
 * 给定精灵ID列表评分
 * Body: { members: [{petId}], bossTypes?: ['龙', '飞行'] }
 */
function score(req, res) {
  const { members, bossTypes } = req.body;

  if (!Array.isArray(members) || members.length === 0) {
    return sendError(res, 400, 'members must be a non-empty array');
  }

  const petIds = members
    .map((m) => (typeof m === 'string' ? m : m.petId))
    .filter(Boolean);

  if (petIds.length === 0) {
    return sendError(res, 400, 'members must contain valid petIds');
  }

  try {
    const result = scoreTeamByIds(petIds, { bossTypes });
    return sendSuccess(res, result);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
}

/**
 * POST /api/v1/teams/counter
 * 给定BOSS属性，推荐克制精灵（基于真实数据）
 * Body: { bossTypes: ['龙'], topN?: 10 }
 */
function recommendCounter(req, res) {
  const { bossTypes, topN = 10 } = req.body;
  if (!Array.isArray(bossTypes) || bossTypes.length === 0) {
    return sendError(res, 400, 'bossTypes required');
  }

  const { findBestCounter, calculateMultiplier } = require('../../data/type-chart');

  // 找出所有克制BOSS属性的精灵
  const counters = [];
  PETS.forEach((pet) => {
    let maxMultiplier = 0;
    for (const atkType of pet.types) {
      const m = calculateMultiplier(atkType, bossTypes);
      if (m > maxMultiplier) maxMultiplier = m;
    }
    if (maxMultiplier >= 2) {
      counters.push({
        id: pet.id,
        name: pet.name,
        types: pet.types,
        statsTotal: pet.statsTotal,
        multiplier: maxMultiplier,
        ability: pet.ability,
      });
    }
  });

  // 排序：先按克制倍率，再按种族值
  counters.sort((a, b) => {
    if (b.multiplier !== a.multiplier) return b.multiplier - a.multiplier;
    return b.statsTotal - a.statsTotal;
  });

  return sendSuccess(res, {
    bossTypes,
    recommended: counters.slice(0, topN),
    total: counters.length,
  });
}

module.exports = { score, recommendCounter };
