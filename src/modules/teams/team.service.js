/**
 * 阵容服务
 */
const { getPetById } = require('../../data/pets');
const { scoreTeam } = require('./team.scoring');

/**
 * 给定精灵ID列表进行阵容评分
 */
function scoreTeamByIds(petIds, options = {}) {
  const pets = petIds
    .map((id) => getPetById(id))
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      name: p.name,
      types: p.types,
      stats: p.stats,
      statsTotal: p.statsTotal,
      forms: p.forms || [],
      ability: p.ability,
    }));

  if (pets.length === 0) {
    throw new Error('No valid pets found');
  }

  return {
    ...scoreTeam(pets, options),
    members: pets.map((p) => ({
      id: p.id,
      name: p.name,
      types: p.types,
      statsTotal: p.statsTotal,
    })),
  };
}

module.exports = { scoreTeamByIds };
