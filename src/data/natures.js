/**
 * 洛克王国：世界 手游 性格表
 *
 * 数据来源：bilibili wiki 性格计算器页
 * 30种性格，每种性格加一项、减一项（6项×5种=30种）
 *
 * 性格不影响种族值本身，只影响个体能力值（公
 *式: 能力值 = ((种族值×2 + 天赋 + 努力/4) × 等级/100 + 10 + 等级) × 性格修正）
 *
 * 性格修正：1.1 (加成项) / 0.9 (减少项) / 1.0 (无修正)
 */

const STATS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe']; // 6项: 生命/物攻/物防/魔攻/魔防/速度
const STAT_NAMES_CN = {
  hp: '生命', atk: '物攻', def: '物防', spa: '魔攻', spd: '魔防', spe: '速度',
};

/**
 * 30种性格，加成项和减少项
 * 数据来自wiki：大胆/固执/调皮/勇敢/逞强/稳重/天真/懒散/悠闲/坦率/
 *            聪明/专注/偏执/冷静/理性/警惕/温顺/害羞/慎重/焦虑/
 *            胆小/急躁/开朗/莽撞/热情/沉默/忧郁/平和/粗心/踏实
 */
const NATURES = [
  { name: '大胆', up: 'atk', down: 'def', desc: '物攻+10%，物防-10%' },
  { name: '固执', up: 'atk', down: 'spa', desc: '物攻+10%，魔攻-10%' },
  { name: '调皮', up: 'atk', down: 'spd', desc: '物攻+10%，魔防-10%' },
  { name: '勇敢', up: 'atk', down: 'spe', desc: '物攻+10%，速度-10%' },
  { name: '逞强', up: 'atk', down: 'hp', desc: '物攻+10%，生命-10%' },
  { name: '稳重', up: 'def', down: 'atk', desc: '物防+10%，物攻-10%' },
  { name: '天真', up: 'def', down: 'spa', desc: '物防+10%，魔攻-10%' },
  { name: '懒散', up: 'def', down: 'spd', desc: '物防+10%，魔防-10%' },
  { name: '悠闲', up: 'def', down: 'spe', desc: '物防+10%，速度-10%' },
  { name: '坦率', up: 'def', down: 'hp', desc: '物防+10%，生命-10%' },
  { name: '聪明', up: 'spa', down: 'atk', desc: '魔攻+10%，物攻-10%' },
  { name: '专注', up: 'spa', down: 'def', desc: '魔攻+10%，物防-10%' },
  { name: '偏执', up: 'spa', down: 'spd', desc: '魔攻+10%，魔防-10%' },
  { name: '冷静', up: 'spa', down: 'spe', desc: '魔攻+10%，速度-10%' },
  { name: '理性', up: 'spa', down: 'hp', desc: '魔攻+10%，生命-10%' },
  { name: '警惕', up: 'spd', down: 'atk', desc: '魔防+10%，物攻-10%' },
  { name: '温顺', up: 'spd', down: 'def', desc: '魔防+10%，物防-10%' },
  { name: '害羞', up: 'spd', down: 'spa', desc: '魔防+10%，魔攻-10%' },
  { name: '慎重', up: 'spd', down: 'spe', desc: '魔防+10%，速度-10%' },
  { name: '焦虑', up: 'spd', down: 'hp', desc: '魔防+10%，生命-10%' },
  { name: '胆小', up: 'spe', down: 'atk', desc: '速度+10%，物攻-10%' },
  { name: '急躁', up: 'spe', down: 'def', desc: '速度+10%，物防-10%' },
  { name: '开朗', up: 'spe', down: 'spa', desc: '速度+10%，魔攻-10%' },
  { name: '莽撞', up: 'spe', down: 'spd', desc: '速度+10%，魔防-10%' },
  { name: '热情', up: 'spe', down: 'hp', desc: '速度+10%，生命-10%' },
  { name: '沉默', up: 'hp', down: 'atk', desc: '生命+10%，物攻-10%' },
  { name: '忧郁', up: 'hp', down: 'def', desc: '生命+10%，物防-10%' },
  { name: '平和', up: 'hp', down: 'spa', desc: '生命+10%，魔攻-10%' },
  { name: '粗心', up: 'hp', down: 'spd', desc: '生命+10%，魔防-10%' },
  { name: '踏实', up: 'hp', down: 'spe', desc: '生命+10%，速度-10%' },
];

/**
 * 性格修正系数
 */
function getNatureMultiplier(natureName, stat) {
  const nature = NATURES.find((n) => n.name === natureName);
  if (!nature) return 1.0;
  if (nature.up === stat) return 1.1;
  if (nature.down === stat) return 0.9;
  return 1.0;
}

/**
 * 推荐性格（按物攻/魔攻型分类）
 */
const RECOMMENDED_NATURES = {
  physical: ['大胆', '固执', '调皮', '勇敢', '逞强'], // 物攻+5项
  special: ['聪明', '专注', '偏执', '冷静', '理性'],  // 魔攻+5项
  tank: ['稳重', '天真', '坦率', '温顺', '害羞'],    // 双防+5项
  fast: ['胆小', '急躁', '开朗', '莽撞', '热情'],     // 速度+5项
};

module.exports = {
  STATS,
  STAT_NAMES_CN,
  NATURES,
  getNatureMultiplier,
  RECOMMENDED_NATURES,
};
