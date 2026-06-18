/**
 * 洛克王国：世界 手游 技能数据库
 *
 * 数据来源：bilibili wiki 精灵详情页（迪莫/魔力猫/花影羚羊/瞌睡王等）
 *
 * 字段：
 *   id - 唯一ID
 *   name - 技能中文名
 *   type - 技能系别
 *   category - 物攻/魔攻/防御/状态
 *   power - 威力（状态技能为null）
 *   energy - 能耗（手游特色，0-8）
 *   desc - 效果简述
 *   source - 默认/血脉/技能石
 *   unlock - 解锁条件
 *
 * 真实技能示例（来自精灵wiki）：
 * - 迪莫：光球(80,2)、光刃(120,4)、放晴(状态,0)
 * - 魔力猫：棘突(100,3)、丰饶(状态,3)、光能聚集(100,7)
 * - 花影羚羊：坟场搏击(180,4)、力量吞噬(状态,4)
 * - 瞌睡王：后发制人(155,3)、压扁(155,5)、气沉丹田(状态,10)
 */

const SKILLS = [
  // ===== 普通系 =====
  { id: 'skill-pose-001', name: '猛烈撞击', type: '普', category: '物攻', power: 65, energy: 1, desc: '对敌方造成物理伤害', source: '默认' },
  { id: 'skill-pose-002', name: '抓挠', type: '普', category: '物攻', power: 35, energy: 0, desc: '造成物伤，自己回复1能量', source: '默认' },
  { id: 'skill-pose-003', name: '扫尾', type: '普', category: '物攻', power: 90, energy: 2, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-pose-004', name: '先发制人', type: '普', category: '物攻', power: 55, energy: 2, desc: '先手+1', source: '默认' },
  { id: 'skill-pose-005', name: '后发制人', type: '普', category: '物攻', power: 155, energy: 3, desc: '先手-1', source: '默认' },
  { id: 'skill-pose-006', name: '压扁', type: '普', category: '物攻', power: 155, energy: 5, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-pose-007', name: '星星撞击', type: '普', category: '魔攻', power: 90, energy: 2, desc: '造成魔法伤害', source: '血脉' },
  { id: 'skill-pose-008', name: '吞噬', type: '普', category: '物攻', power: 150, energy: 6, desc: '击败敌方回复6能量', source: '技能石' },
  { id: 'skill-pose-009', name: '重击', type: '普', category: '物攻', power: 110, energy: 2, desc: '每次使用后能耗永久+1', source: '技能石' },
  { id: 'skill-pose-010', name: '借用', type: '普', category: '状态', power: null, energy: 0, desc: '随机变成队友技能', source: '技能石' },
  { id: 'skill-pose-011', name: '力量增效', type: '普', category: '状态', power: null, energy: 1, desc: '物攻+100%', source: '默认' },
  { id: 'skill-pose-012', name: '魔法增效', type: '普', category: '状态', power: null, energy: 0, desc: '魔攻+70%', source: '默认' },
  { id: 'skill-pose-013', name: '防御', type: '普', category: '防御', power: null, energy: 1, desc: '减伤70%应对攻击', source: '默认' },
  { id: 'skill-pose-014', name: '有效预防', type: '普', category: '防御', power: null, energy: 1, desc: '减伤50%，下次先手+1', source: '技能石' },
  { id: 'skill-pose-015', name: '应激反应', type: '普', category: '状态', power: null, energy: 2, desc: '回复25%生命（应对防御则50%）', source: '技能石' },
  { id: 'skill-pose-016', name: '休息回复', type: '普', category: '状态', power: null, energy: 2, desc: '自己回复30%生命', source: '默认' },
  { id: 'skill-pose-017', name: '晒太阳', type: '普', category: '状态', power: null, energy: 1, desc: '驱散敌方所有增益', source: '默认' },
  { id: 'skill-pose-018', name: '精神扰乱', type: '普', category: '状态', power: null, energy: 0, desc: '敌方全技能能耗+1', source: '技能石' },
  { id: 'skill-pose-019', name: '垂死反击', type: '普', category: '物攻', power: 80, energy: 4, desc: '血量越低威力越高', source: '技能石' },
  { id: 'skill-pose-020', name: '偷袭', type: '普', category: '物攻', power: 85, energy: 3, desc: '应对状态威力变为3倍', source: '默认' },

  // ===== 火系 =====
  { id: 'skill-fire-001', name: '火焰箭', type: '火', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-fire-002', name: '炎打', type: '火', category: '魔攻', power: 95, energy: 2, desc: '造成高额魔伤，自己物防-40%', source: '技能石' },
  { id: 'skill-fire-003', name: '闪燃', type: '火', category: '物攻', power: 40, energy: 1, desc: '应对状态威力变为4倍', source: '技能石' },
  { id: 'skill-fire-004', name: '怒火', type: '火', category: '状态', power: null, energy: 1, desc: '双攻+120%，双防-40%', source: '技能石' },
  { id: 'skill-fire-005', name: '火焰冲锋', type: '火', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-fire-006', name: '引燃', type: '火', category: '状态', power: null, energy: 2, desc: '敌方获得10层灼烧', source: '血脉' },

  // ===== 水系 =====
  { id: 'skill-water-001', name: '潮涌', type: '水', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-water-002', name: '气泡', type: '水', category: '魔攻', power: 100, energy: 3, desc: '造成魔法伤害', source: '技能石' },
  { id: 'skill-water-003', name: '天洪', type: '水', category: '魔攻', power: 150, energy: 7, desc: '造成魔伤，应对状态能耗永久-6', source: '技能石' },
  { id: 'skill-water-004', name: '润泽', type: '水', category: '状态', power: null, energy: 7, desc: '自己获得魔攻+190%', source: '技能石' },
  { id: 'skill-water-005', name: '泡沫', type: '水', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-water-006', name: '蓄水', type: '水', category: '状态', power: null, energy: 1, desc: '下次技能能耗-6', source: '血脉' },

  // ===== 草系 =====
  { id: 'skill-grass-001', name: '棘突', type: '草', category: '魔攻', power: 100, energy: 3, desc: '造成魔法伤害', source: '默认' },
  { id: 'skill-grass-002', name: '藤绞', type: '草', category: '物攻', power: 80, energy: 4, desc: '造成物伤，自己回复5能量', source: '技能石' },
  { id: 'skill-grass-003', name: '抽枝', type: '草', category: '物攻', power: 90, energy: 4, desc: '应对状态回复50%生命和5能量', source: '技能石' },
  { id: 'skill-grass-004', name: '氧输送', type: '草', category: '状态', power: null, energy: 2, desc: '回复4能量，魔攻+70%', source: '技能石' },
  { id: 'skill-grass-005', name: '叶绿光束', type: '草', category: '魔攻', power: 120, energy: 4, desc: '造成魔法伤害', source: '默认' },
  { id: 'skill-grass-006', name: '丰饶', type: '草', category: '状态', power: null, energy: 3, desc: '物攻和魔攻+140%', source: '默认' },
  { id: 'skill-grass-007', name: '仙人掌刺击', type: '草', category: '物攻', power: 150, energy: 6, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-grass-008', name: '光能聚集', type: '草', category: '魔攻', power: 100, energy: 7, desc: '使用其他草系技能后威力永久+60', source: '默认' },
  { id: 'skill-grass-009', name: '筛管奔流', type: '草', category: '物攻', power: 80, energy: 3, desc: '生命>80%时威力+75', source: '默认' },
  { id: 'skill-grass-010', name: '徒长', type: '草', category: '状态', power: null, energy: 2, desc: '自己回复10能量', source: '默认' },
  { id: 'skill-grass-011', name: '孢子', type: '草', category: '状态', power: null, energy: 3, desc: '敌方获得1层寄生', source: '默认' },
  { id: 'skill-grass-012', name: '花香', type: '草', category: '魔攻', power: 60, energy: 1, desc: '造成魔法伤害', source: '血脉' },
  { id: 'skill-grass-013', name: '富养化', type: '草', category: '状态', power: null, energy: 3, desc: '敌方受到持续伤害', source: '技能石' },
  { id: 'skill-grass-014', name: '移花接木', type: '草', category: '状态', power: null, energy: 2, desc: '回复15%生命后脱离', source: '技能石' },

  // ===== 电系 =====
  { id: 'skill-elec-001', name: '超导', type: '电', category: '魔攻', power: 95, energy: 3, desc: '造成魔伤，迸发：本技能能耗-1', source: '默认' },
  { id: 'skill-elec-002', name: '电弧', type: '电', category: '物攻', power: 80, energy: 3, desc: '迸发：威力+40', source: '技能石' },
  { id: 'skill-elec-003', name: '球状闪电', type: '电', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-elec-004', name: '麻痹', type: '电', category: '状态', power: null, energy: 2, desc: '敌方先手-1', source: '血脉' },

  // ===== 冰系 =====
  { id: 'skill-ice-001', name: '冰爪', type: '冰', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-ice-002', name: '寒风吹', type: '冰', category: '魔攻', power: 70, energy: 3, desc: '造成魔伤，敌方魔防-50%', source: '技能石' },
  { id: 'skill-ice-003', name: '冷风', type: '冰', category: '魔攻', power: 60, energy: 1, desc: '造成魔法伤害', source: '血脉' },
  { id: 'skill-ice-004', name: '霜降', type: '冰', category: '状态', power: null, energy: 1, desc: '敌方获得4层冻结', source: '血脉' },
  { id: 'skill-ice-005', name: '冰雹', type: '冰', category: '魔攻', power: 90, energy: 3, desc: '造成魔法伤害', source: '技能石' },
  { id: 'skill-ice-006', name: '雪球', type: '冰', category: '物攻', power: 105, energy: 4, desc: '造成物理伤害', source: '技能石' },

  // ===== 武系 =====
  { id: 'skill-fight-001', name: '寸拳', type: '武', category: '物攻', power: 30, energy: 0, desc: '回复1能量', source: '默认' },
  { id: 'skill-fight-002', name: '化劲', type: '武', category: '状态', power: null, energy: 2, desc: '全技能威力+40', source: '默认' },
  { id: 'skill-fight-003', name: '回旋踢', type: '武', category: '物攻', power: 80, energy: 3, desc: '敌方换宠威力翻倍', source: '默认' },
  { id: 'skill-fight-004', name: '斩断', type: '武', category: '物攻', power: 70, energy: 2, desc: '应对时打断敌方技能', source: '默认' },
  { id: 'skill-fight-005', name: '技巧打击', type: '武', category: '物攻', power: 35, energy: 2, desc: '应对状态威力变为10倍', source: '默认' },
  { id: 'skill-fight-006', name: '气沉丹田', type: '武', category: '状态', power: null, energy: 10, desc: '回复60%生命，物攻+130%', source: '默认' },
  { id: 'skill-fight-007', name: '一拳', type: '武', category: '物攻', power: 140, energy: 5, desc: '造成物理伤害', source: '技能石' },
  { id: 'skill-fight-008', name: '爆冲', type: '武', category: '物攻', power: 65, energy: 3, desc: '应对威力5倍', source: '技能石' },
  { id: 'skill-fight-009', name: '提气', type: '武', category: '状态', power: null, energy: 4, desc: '全技能威力+40', source: '技能石' },
  { id: 'skill-fight-010', name: '缠丝劲', type: '武', category: '物攻', power: 25, energy: 1, desc: '2连击物伤', source: '血脉' },

  // ===== 毒系 =====
  { id: 'skill-poison-001', name: '毒沼', type: '毒', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '技能石' },
  { id: 'skill-poison-002', name: '腐蚀酸液', type: '毒', category: '魔攻', power: 35, energy: 2, desc: '造成魔伤，敌方获得2层中毒', source: '技能石' },
  { id: 'skill-poison-003', name: '瘴气喷射', type: '毒', category: '魔攻', power: 100, energy: 3, desc: '造成魔法伤害', source: '技能石' },
  { id: 'skill-poison-004', name: '毒孢子', type: '毒', category: '状态', power: null, energy: 3, desc: '敌方获得5层中毒', source: '技能石' },
  { id: 'skill-poison-005', name: '溃烂触碰', type: '毒', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-poison-006', name: '剧毒', type: '毒', category: '状态', power: null, energy: 2, desc: '敌方获得3层中毒', source: '技能石' },

  // ===== 地系 =====
  { id: 'skill-ground-001', name: '热砂', type: '地', category: '魔攻', power: 80, energy: 2, desc: '造成魔法伤害', source: '默认' },
  { id: 'skill-ground-002', name: '跺地', type: '地', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '技能石' },
  { id: 'skill-ground-003', name: '扬沙', type: '地', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-ground-004', name: '泥浆铠甲', type: '地', category: '状态', power: null, energy: 2, desc: '物攻和物防+60%', source: '血脉' },

  // ===== 飞系（手游是"翼"） =====
  { id: 'skill-fly-001', name: '鹰爪', type: '飞', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-fly-002', name: '羽化加速', type: '飞', category: '状态', power: null, energy: 2, desc: '全技能威力+20，迅捷', source: '血脉' },

  // ===== 虫系 =====
  { id: 'skill-bug-001', name: '尾后针', type: '虫', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '技能石' },
  { id: 'skill-bug-002', name: '噬心', type: '虫', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-bug-003', name: '假寐', type: '虫', category: '状态', power: null, energy: 2, desc: '回复2能量，己方队伍获奉献', source: '血脉' },

  // ===== 萌系 =====
  { id: 'skill-fairy-001', name: '魅惑', type: '萌', category: '魔攻', power: 60, energy: 1, desc: '造成魔法伤害', source: '血脉' },
  { id: 'skill-fairy-002', name: '甜心续航', type: '萌', category: '状态', power: null, energy: 3, desc: '双方萌化回复40%生命', source: '血脉' },

  // ===== 恶系 =====
  { id: 'skill-dark-001', name: '恶能量', type: '恶', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-dark-002', name: '撕咬', type: '恶', category: '物攻', power: 30, energy: 3, desc: '3连击，生命<50%时连击数+2', source: '默认' },
  { id: 'skill-dark-003', name: '极限撕裂', type: '恶', category: '物攻', power: 135, energy: 4, desc: '生命>50%使用后双攻-50%', source: '默认' },
  { id: 'skill-dark-004', name: '坟场搏击', type: '恶', category: '物攻', power: 180, energy: 4, desc: '敌方每有1能量，威力-10%', source: '默认' },
  { id: 'skill-dark-005', name: '力量吞噬', type: '恶', category: '状态', power: null, energy: 4, desc: '敌方全技能威力-20，自己+20', source: '默认' },
  { id: 'skill-dark-006', name: '隐藏条款', type: '恶', category: '状态', power: null, energy: 8, desc: '与敌方交换携带技能', source: '技能石' },
  { id: 'skill-dark-007', name: '欺诈契约', type: '恶', category: '状态', power: null, energy: 3, desc: '与敌方交换增益减益', source: '技能石' },

  // ===== 幽系 =====
  { id: 'skill-ghost-001', name: '幻象', type: '幽', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-ghost-002', name: '勾魂', type: '幽', category: '状态', power: null, energy: 1, desc: '偷取敌方3能量', source: '默认' },
  { id: 'skill-ghost-003', name: '降灵', type: '幽', category: '状态', power: null, energy: 2, desc: '敌方获得1层降灵印记', source: '默认' },
  { id: 'skill-ghost-004', name: '恶作剧', type: '幽', category: '状态', power: null, energy: 1, desc: '敌方失去3能量', source: '默认' },
  { id: 'skill-ghost-005', name: '灵媒', type: '幽', category: '魔攻', power: 100, energy: 3, desc: '造成魔法伤害', source: '血脉' },

  // ===== 光系 =====
  { id: 'skill-light-001', name: '闪光', type: '光', category: '魔攻', power: 60, energy: 1, desc: '造成魔法伤害', source: '默认' },
  { id: 'skill-light-002', name: '光球', type: '光', category: '魔攻', power: 80, energy: 2, desc: '造成魔法伤害', source: '默认' },
  { id: 'skill-light-003', name: '闪光冲击', type: '光', category: '物攻', power: 100, energy: 3, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-light-004', name: '光刃', type: '光', category: '物攻', power: 120, energy: 4, desc: '造成物理伤害', source: '默认' },
  { id: 'skill-light-005', name: '放晴', type: '光', category: '状态', power: null, energy: 0, desc: '光系技能威力永久+50%', source: '默认' },
  { id: 'skill-light-006', name: '漫反射', type: '光', category: '状态', power: null, energy: 1, desc: '每种系别的1个技能威力+35', source: '默认' },
  { id: 'skill-light-007', name: '过曝', type: '光', category: '魔攻', power: 60, energy: 3, desc: '每使用过1个其他系别技能，威力永久+30', source: '默认' },
  { id: 'skill-light-008', name: '折线冲击', type: '光', category: '物攻', power: 80, energy: 2, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-light-009', name: '透射', type: '光', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },
  { id: 'skill-light-010', name: '虹光冲击', type: '光', category: '魔攻', power: 100, energy: 3, desc: '造成魔法伤害', source: '血脉' },
  { id: 'skill-light-011', name: '天光', type: '光', category: '魔攻', power: 95, energy: 3, desc: '系别与天气系别相同', source: '技能石' },

  // ===== 龙系 =====
  { id: 'skill-dragon-001', name: '升龙咆哮', type: '龙', category: '魔攻', power: 200, energy: 3, desc: '蓄力造成魔法伤害', source: '血脉' },

  // ===== 幻系（手游血脉） =====
  { id: 'skill-illusion-001', name: '坍缩', type: '幻', category: '魔攻', power: 85, energy: 3, desc: '击败敌方时自己魔攻+70%', source: '技能石' },
  { id: 'skill-illusion-002', name: '星云漩涡', type: '幻', category: '物攻', power: 60, energy: 1, desc: '造成物理伤害', source: '血脉' },

  // ===== 机械系（手游血脉） =====
  { id: 'skill-mech-001', name: '离子震荡', type: '机械', category: '魔攻', power: 90, energy: 3, desc: '位于3号位时威力+40，传动1', source: '血脉' },
  { id: 'skill-mech-002', name: '啮合传递', type: '机械', category: '状态', power: null, energy: 1, desc: '速度+30，传动1', source: '血脉' },
];

function getSkillById(id) {
  return SKILLS.find((s) => s.id === id);
}

function searchSkills({ keyword, type, category, energyMax, powerMin, page = 1, pageSize = 20 } = {}) {
  let result = SKILLS;

  if (keyword) {
    const kw = keyword.toLowerCase();
    result = result.filter((s) => s.name.includes(keyword) || s.id.toLowerCase().includes(kw));
  }
  if (type) {
    result = result.filter((s) => s.type === type);
  }
  if (category) {
    result = result.filter((s) => s.category === category);
  }
  if (energyMax != null) {
    result = result.filter((s) => s.energy <= energyMax);
  }
  if (powerMin != null) {
    result = result.filter((s) => s.power != null && s.power >= powerMin);
  }

  const total = result.length;
  const start = (page - 1) * pageSize;
  const items = result.slice(start, start + pageSize);
  return { items, total, page, pageSize };
}

module.exports = {
  SKILLS,
  getSkillById,
  searchSkills,
};
