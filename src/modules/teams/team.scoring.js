/**
 * 洛克王国：世界 手游 阵容评分算法
 *
 * 评分维度（100分制）：
 * 1. 资质战力（30分） - 队伍种族值平均，参考手游高资质精灵
 * 2. 属性覆盖（25分） - 进攻覆盖多种属性（每多覆盖1种+5分，上限15分）
 *                       抵抗被各种属性攻击的稳定性（10分）
 * 3. 联防互补（20分） - 队友间属性互相弥补弱点
 * 4. 速度节奏（15分） - 队伍速度分布，先手覆盖
 * 5. 形态完整（10分） - 是否每只精灵带形态
 *
 * 等级评定：
 *   90+ S级
 *   80+ A级
 *   70+ B级
 *   60+ C级
 *   60- D级
 */

const { TYPES, calculateMultiplier, findBestCounter, getDefensiveMatchups } = require('../../data/type-chart');
const { getPetById } = require('../../data/pets');

/**
 * 1. 资质战力评分（30分）
 * 队伍平均种族值越高越好
 * 参考：迪莫582 瞌睡王685 魔力猫613
 * 阈值：平均500满分（30分），平均400得24分，平均300得15分
 */
function scoreBaseStats(pets) {
  if (pets.length === 0) return { score: 0, avg: 0, max: 0 };
  const totals = pets.map((p) => p.statsTotal);
  const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
  const max = Math.max(...totals);

  // 线性映射：300=10分, 500=30分
  let score = ((avg - 300) / 200) * 20 + 10;
  score = Math.max(0, Math.min(30, score));
  return { score: Math.round(score), avg: Math.round(avg), max };
}

/**
 * 2. 属性覆盖评分（25分）
 * 进攻覆盖：队伍的所有属性组成进攻组合，能克制多少种属性
 * 防守稳定：被各种属性攻击时，被克制的属性种类是否少
 */
function scoreTypeCoverage(pets) {
  // 收集队伍所有属性
  const allTypes = new Set();
  pets.forEach((p) => p.types.forEach((t) => allTypes.add(t)));
  const teamTypes = Array.from(allTypes);

  // 进攻覆盖：能造成2倍伤害的属性数
  const superEffectiveTargets = new Set();
  TYPES.forEach((target) => {
    let isSuper = false;
    for (const atkType of teamTypes) {
      if (calculateMultiplier(atkType, target) >= 2) {
        isSuper = true;
        break;
      }
    }
    if (isSuper) superEffectiveTargets.add(target);
  });
  const offenseScore = Math.min(15, superEffectiveTargets.size * 1.5);

  // 防守稳定：被所有属性攻击，被克制的属性种类数
  let vulnerableCount = 0;
  pets.forEach((pet) => {
    const matchups = getDefensiveMatchups(pet.types);
    if (matchups.some((m) => m.multiplier >= 2)) vulnerableCount++;
  });
  // 越少越稳定，满分10分
  const defenseScore = Math.max(0, 10 - vulnerableCount * 2);

  return {
    score: Math.round(offenseScore + defenseScore),
    teamTypes,
    superEffectiveCount: superEffectiveTargets.size,
    superEffectiveTargets: Array.from(superEffectiveTargets),
    vulnerableCount,
  };
}

/**
 * 3. 联防互补评分（20分）
 * 检查队友间的属性是否互相弥补
 * - 队友A的弱点属性，队友B是否能抵抗
 * - 队友A的攻击属性，是否被队友B的弱点覆盖
 */
function scoreDefensiveSynergy(pets) {
  if (pets.length < 2) return { score: 0, weaknessCovered: 0, totalWeakness: 0 };

  // 收集每只精灵的弱点
  const teamWeaknessMap = new Map(); // 弱点属性 -> 能抵抗的精灵数
  pets.forEach((pet) => {
    const matchups = getDefensiveMatchups(pet.types);
    matchups.forEach((m) => {
      if (m.multiplier >= 2) {
        // 这只精灵被 m.attacker 克制
        if (!teamWeaknessMap.has(m.attacker)) teamWeaknessMap.set(m.attacker, []);
        teamWeaknessMap.get(m.attacker).push(pet.name);
      }
    });
  });

  // 检查每种弱点，是否有队友能抵抗
  let totalWeakness = 0;
  let coveredWeakness = 0;
  for (const [weaknessType, vulnerablePets] of teamWeaknessMap.entries()) {
    totalWeakness += vulnerablePets.length;
    // 找有没有队友能抵抗该属性
    const hasCounter = pets.some((p) => {
      const m = calculateMultiplier(weaknessType, p.types);
      return m <= 0.5; // 抵抗或免疫
    });
    if (hasCounter) coveredWeakness += vulnerablePets.length;
  }

  // 比例 = covered / total
  const ratio = totalWeakness > 0 ? coveredWeakness / totalWeakness : 1;
  const score = Math.round(ratio * 20);
  return { score, weaknessCovered: coveredWeakness, totalWeakness };
}

/**
 * 4. 速度节奏评分（15分）
 * 队伍速度分布：
 * - 高速(>100)精灵数量：先手覆盖
 * - 低速(<70)精灵数量：反击收割
 * - 平衡度：速度不要都堆一起
 */
function scoreSpeed(pets) {
  if (pets.length === 0) return { score: 0, fast: 0, slow: 0, avg: 0 };

  const speeds = pets.map((p) => p.stats.spe);
  const fast = speeds.filter((s) => s >= 100).length;
  const slow = speeds.filter((s) => s < 70).length;
  const avg = speeds.reduce((a, b) => a + b, 0) / speeds.length;

  // 高速+1分（先手），最高7分
  const fastScore = Math.min(7, fast * 1.5);
  // 低速+0.5分（反击位），最高3分
  const slowScore = Math.min(3, slow * 0.5);
  // 平均速度覆盖：70-110之间得5分
  let balanceScore = 0;
  if (avg >= 70 && avg <= 110) balanceScore = 5;
  else if (avg >= 50 && avg <= 130) balanceScore = 3;
  else balanceScore = 1;

  return {
    score: Math.round(fastScore + slowScore + balanceScore),
    fast,
    slow,
    avg: Math.round(avg),
  };
}

/**
 * 5. 形态完整评分（10分）
 * 队伍中带形态的精灵比例
 */
function scoreFormCompletion(pets) {
  if (pets.length === 0) return { score: 0, withForm: 0 };
  const withForm = pets.filter((p) => p.forms && p.forms.length > 0).length;
  const ratio = withForm / pets.length;
  return { score: Math.round(ratio * 10), withForm };
}

/**
 * 主评分函数
 */
function scoreTeam(pets, options = {}) {
  const { bossTypes = [] } = options;

  const breakdown = {
    baseStats: scoreBaseStats(pets),
    typeCoverage: scoreTypeCoverage(pets),
    defensiveSynergy: scoreDefensiveSynergy(pets),
    speed: scoreSpeed(pets),
    formCompletion: scoreFormCompletion(pets),
  };

  // 如果指定BOSS属性，调整属性覆盖评分权重
  let bossScore = null;
  if (bossTypes.length > 0) {
    const counters = findBestCounter(bossTypes);
    const teamHasCounter = counters.some((c) =>
      pets.some((p) => p.types.includes(c.type)),
    );
    bossScore = {
      bossTypes,
      counters: counters.slice(0, 5),
      teamHasCounter,
      score: teamHasCounter ? 100 : 0,
    };
  }

  const total = Object.values(breakdown).reduce((a, b) => a + b.score, 0);

  // 等级
  let rank = 'D';
  if (total >= 90) rank = 'S';
  else if (total >= 80) rank = 'A';
  else if (total >= 70) rank = 'B';
  else if (total >= 60) rank = 'C';

  // 建议
  const suggestions = generateSuggestions(breakdown, pets, bossTypes);

  return {
    total,
    rank,
    breakdown,
    bossScore,
    suggestions,
    memberCount: pets.length,
  };
}

/**
 * 生成优化建议
 */
function generateSuggestions(breakdown, pets, bossTypes) {
  const suggestions = [];

  if (breakdown.baseStats.score < 20) {
    suggestions.push({
      type: 'warning',
      text: `队伍平均种族值仅 ${breakdown.baseStats.avg}，建议加入瞌睡王(685)、魔力猫(613)等高资质精灵`,
    });
  }

  if (breakdown.typeCoverage.superEffectiveCount < 8) {
    suggestions.push({
      type: 'info',
      text: `只能克制 ${breakdown.typeCoverage.superEffectiveCount}/18 种属性，建议补充光/翼/龙系输出精灵`,
    });
  }

  if (breakdown.typeCoverage.vulnerableCount >= 4) {
    suggestions.push({
      type: 'warning',
      text: `有 ${breakdown.typeCoverage.vulnerableCount} 只精灵存在属性弱点，建议加入能联防的精灵`,
    });
  }

  if (breakdown.defensiveSynergy.score < 12) {
    suggestions.push({
      type: 'warning',
      text: `联防互补较弱（${breakdown.defensiveSynergy.score}/20），队友弱点没有互相弥补`,
    });
  }

  if (breakdown.speed.fast === 0) {
    suggestions.push({
      type: 'info',
      text: '队伍没有高速精灵(速度≥100)，建议加入岚鸟(130)或卷胡巨獭(110)抢占先手',
    });
  }

  if (breakdown.formCompletion.score < 5) {
    suggestions.push({
      type: 'info',
      text: '队伍中没有可切换形态的精灵，建议加入卡瓦重(3种地域形态)或晶石蜗(6种矿石形态)',
    });
  }

  if (bossTypes.length > 0 && breakdown.typeCoverage.teamTypes) {
    const counters = findBestCounter(bossTypes);
    const hasAny = counters.some((c) => pets.some((p) => p.types.includes(c.type)));
    if (!hasAny) {
      suggestions.push({
        type: 'warning',
        text: `BOSS属性为 ${bossTypes.join('/')}，建议加入 ${counters.slice(0, 3).map((c) => c.type).join('/')} 系精灵克制`,
      });
    }
  }

  if (suggestions.length === 0) {
    suggestions.push({
      type: 'success',
      text: '阵容表现出色！可以尝试挑战PVE或PVP对战了',
    });
  }

  return suggestions;
}

module.exports = {
  scoreTeam,
  scoreBaseStats,
  scoreTypeCoverage,
  scoreDefensiveSynergy,
  scoreSpeed,
  scoreFormCompletion,
};
