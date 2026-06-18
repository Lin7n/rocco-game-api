/**
 * 洛克王国：世界 手游 精灵数据库
 *
 * 数据来源：bilibili wiki + 官方17173/游民星空
 * 字段：
 *   id - 唯一ID
 *   no - 游戏内编号
 *   name - 名称
 *   types - 属性数组（1-2个）
 *   stats - 6维种族值 {hp, atk, def, spa, spd, spe}
 *   statsTotal - 种族值总和
 *   ability - 特性
 *   evolution - 进化链
 *   forms - 形态变体 (可选)
 *   category - 分类（梦想/自然/拟人/虫/植物/机械...）
 *   height, weight, price, starlight - 其他信息
 *
 * 真实数据精灵（来自官方wiki）：
 * - 迪莫(001) 光系 582 - 梦想类
 * - 瞌睡王(075) 普通+武 685 - 自然类
 * - 魔力猫(004) 草系 613 - 猫咪类
 * - 花影羚羊(017) 幽+恶 582 - 拟人类
 * - 雪绒鸟/冬羽雀/岚鸟(018-020) 翼系 4季节形态
 * - 鸭吉吉(011) 普通系 6种性格形态
 * - 卡瓦重(046) 草+地/冰 3种地域形态
 * - 晶石蜗(040) 光+地 6种矿石形态
 * - 化蝶(034) 虫+萌 4种进化球形态
 * - 蹦蹦种子/草(063-064) 草+毒 4种球形态
 */

const PETS = [
  // ===== 001 迪莫 - 公测核心精灵 =====
  {
    id: 'demo',
    no: '001',
    name: '迪莫',
    types: ['光'],
    stats: { hp: 120, atk: 80, spa: 80, def: 105, spd: 105, spe: 92 },
    statsTotal: 582,
    ability: { name: '最好的伙伴', desc: '造成克制伤害后，获得攻防速+20%，并回复2能量' },
    category: '梦想类',
    evolution: { prev: null, next: null, stage: 1, isStarter: true },
    height: '0.54~0.78M',
    weight: '5.5~7KG',
    price: 0,
    starlight: 0,
    description: '洛克王国手游公测初始精灵，光系梦想类。技能池覆盖普通/火/水/草/电/冰/地/光/幻/龙等10+系，俗称"万金油"。',
    traits: { hidden: '慈悲为怀' },
  },

  // ===== 002-004 喵喵进化链 =====
  {
    id: 'miaomiao',
    no: '002',
    name: '喵喵',
    types: ['草'],
    stats: { hp: 95, atk: 75, spa: 75, def: 65, spd: 95, spe: 60 },
    statsTotal: 465,
    ability: { name: '叶绿素', desc: '使用草系技能后，魔攻+50%' },
    category: '猫咪类',
    evolution: { prev: null, next: 'huolimiao', stage: 1 },
  },
  {
    id: 'huolimiao',
    no: '003',
    name: '活力喵',
    types: ['草'],
    stats: { hp: 102, atk: 92, spa: 92, def: 73, spd: 123, spe: 58 },
    statsTotal: 540,
    ability: { name: '光合作用', desc: '使用草系技能后，回复8%生命' },
    category: '猫咪类',
    evolution: { prev: 'miaomiao', next: 'molimao', stage: 2 },
  },
  {
    id: 'molimao',
    no: '004',
    name: '魔力猫',
    types: ['草'],
    stats: { hp: 108, atk: 109, spa: 109, def: 81, spd: 151, spe: 55 },
    statsTotal: 613,
    ability: { name: '氧循环', desc: '使用草系技能后，回复10%生命' },
    category: '猫咪类',
    evolution: { prev: 'huolimiao', next: null, stage: 3, isBoss: true },
    height: '1.5~2.15M',
    weight: '105~125KG',
    price: 4500,
    starlight: 60,
    description: '猫咪进化链终极形态，高魔防的草系法师。血量高于80%时筛管奔流威力+75。',
  },

  // ===== 005-007 火花进化链 =====
  {
    id: 'huohua',
    no: '005',
    name: '火花',
    types: ['火'],
    stats: { hp: 95, atk: 80, spa: 80, def: 65, spd: 70, spe: 70 },
    statsTotal: 460,
    ability: { name: '引燃', desc: '火系技能附带1层灼烧' },
    category: '火系类',
    evolution: { prev: null, next: 'yanhuo', stage: 1 },
  },
  {
    id: 'yanhuo',
    no: '006',
    name: '焰火',
    types: ['火'],
    stats: { hp: 105, atk: 110, spa: 95, def: 75, spd: 85, spe: 85 },
    statsTotal: 555,
    ability: { name: '烈焰之心', desc: '火系技能威力+15%' },
    category: '火系类',
    evolution: { prev: 'huohua', next: 'huoshen', stage: 2 },
  },
  {
    id: 'huoshen',
    no: '007',
    name: '火神',
    types: ['火'],
    stats: { hp: 115, atk: 125, spa: 110, def: 85, spd: 95, spe: 95 },
    statsTotal: 625,
    ability: { name: '烈火战神', desc: '使用火系技能后，物攻+30%' },
    category: '火系类',
    evolution: { prev: 'yanhuo', next: null, stage: 3, isBoss: true },
  },

  // ===== 008-010 水蓝蓝进化链 =====
  {
    id: 'shuilanlan',
    no: '008',
    name: '水蓝蓝',
    types: ['水'],
    stats: { hp: 95, atk: 70, spa: 70, def: 70, spd: 70, spe: 70 },
    statsTotal: 445,
    ability: { name: '蓄水', desc: '水系技能能耗-1' },
    category: '水系类',
    evolution: { prev: null, next: 'bopola', stage: 1 },
  },
  {
    id: 'bopola',
    no: '009',
    name: '波波拉',
    types: ['水'],
    stats: { hp: 105, atk: 85, spa: 90, def: 80, spd: 90, spe: 75 },
    statsTotal: 525,
    ability: { name: '潮汐', desc: '每回合开始回复5%生命' },
    category: '水系类',
    evolution: { prev: 'shuilanlan', next: 'shuiling', stage: 2 },
  },
  {
    id: 'shuiling',
    no: '010',
    name: '水灵',
    types: ['水'],
    stats: { hp: 120, atk: 95, spa: 110, def: 95, spd: 110, spe: 90 },
    statsTotal: 620,
    ability: { name: '圣水守护', desc: '受攻击时减伤20%' },
    category: '水系类',
    evolution: { prev: 'bopola', next: null, stage: 3, isBoss: true },
  },

  // ===== 011 鸭吉吉 - 6种形态 =====
  {
    id: 'yajiji',
    no: '011',
    name: '鸭吉吉',
    types: ['普'],
    stats: { hp: 110, atk: 95, spa: 50, def: 90, spd: 90, spe: 75 },
    statsTotal: 510,
    ability: { name: '应急状态', desc: '濒血时双防+50%' },
    category: '拟人类',
    evolution: { prev: null, next: null, stage: 1 },
    forms: [
      { formId: 'yajiji-pengsong', name: '蓬松的样子', types: ['普'], statsBonus: { hp: 10 } },
      { formId: 'yajiji-jinshi', name: '紧实的样子', types: ['普'], statsBonus: { atk: 10 } },
      { formId: 'yajiji-jijiduck', name: '急急急鸭', types: ['普'], statsBonus: { spe: 15 } },
      { formId: 'yajiji-dengyiduck', name: '等一等鸭', types: ['普'], statsBonus: { spd: 10 } },
      { formId: 'yajiji-ranleduck', name: '燃了鸭', types: ['火'], statsBonus: { spa: 15 } },
      { formId: 'yajiji-qilaiduck', name: '起来鸭', types: ['飞'], statsBonus: { atk: 10, spe: 10 } },
    ],
    description: '拥有6种性格/状态形态，可通过游戏内行为解锁。形态改变属性和资质。',
  },

  // ===== 015-017 花影羚羊进化链（双属性） =====
  {
    id: 'zhuiweiyang',
    no: '015',
    name: '锥尾羊',
    types: ['幽'],
    stats: { hp: 90, atk: 90, spa: 40, def: 100, spd: 60, spe: 85 },
    statsTotal: 465,
    ability: { name: '幽影', desc: '幽系技能威力+15%' },
    category: '拟人类',
    evolution: { prev: null, next: 'linglanyang', stage: 1 },
  },
  {
    id: 'linglanyang',
    no: '016',
    name: '铃兰羊',
    types: ['幽'],
    stats: { hp: 102, atk: 102, spa: 45, def: 110, spd: 70, spe: 98 },
    statsTotal: 527,
    ability: { name: '铃兰之息', desc: '使用幽系技能后，敌方魔防-15%' },
    category: '拟人类',
    evolution: { prev: 'zhuiweiyang', next: 'huayinglingyang', stage: 2 },
  },
  {
    id: 'huayinglingyang',
    no: '017',
    name: '花影羚羊',
    types: ['幽', '恶'],
    stats: { hp: 112, atk: 111, spa: 48, def: 120, spd: 81, spe: 110 },
    statsTotal: 582,
    ability: { name: '碰瓷', desc: '使用恶系技能后，敌方失去2能量' },
    category: '拟人类',
    evolution: { prev: 'linglanyang', next: null, stage: 3, isBoss: true },
    height: '1.42~1.92M',
    weight: '76.9~98KG',
    price: 3000,
    starlight: 40,
    description: '高物攻+物防的幽恶双属性精灵。技能"坟场搏击"威力180，能耗4，是高耗高威力技能的代表。',
  },

  // ===== 018-020 雪绒鸟进化链 - 4种季节形态 =====
  {
    id: 'xuerongniao',
    no: '018',
    name: '雪绒鸟',
    types: ['飞'],
    stats: { hp: 95, atk: 70, spa: 70, def: 70, spd: 70, spe: 90 },
    statsTotal: 465,
    ability: { name: '羽化', desc: '首次使用翼系技能，威力+50%' },
    category: '鸟类',
    evolution: { prev: null, next: 'dongyuque', stage: 1 },
    forms: [
      { formId: 'xuerongniao-spring', name: '春天的样子', types: ['飞', '草'], statsBonus: { spa: 10 } },
      { formId: 'xuerongniao-summer', name: '夏天的样子', types: ['飞', '火'], statsBonus: { atk: 10 } },
      { formId: 'xuerongniao-autumn', name: '秋天的样子', types: ['飞', '地'], statsBonus: { def: 10 } },
      { formId: 'xuerongniao-default', name: '默认样子', types: ['飞'], statsBonus: {} },
    ],
  },
  {
    id: 'dongyuque',
    no: '019',
    name: '冬羽雀',
    types: ['飞'],
    stats: { hp: 105, atk: 80, spa: 90, def: 80, spd: 85, spe: 110 },
    statsTotal: 550,
    ability: { name: '季节变换', desc: '每4回合自动变换形态' },
    category: '鸟类',
    evolution: { prev: 'xuerongniao', next: 'lanniao', stage: 2 },
    forms: [
      { formId: 'dongyuque-spring', name: '春天的样子', types: ['飞', '草'], statsBonus: { spa: 15 } },
      { formId: 'dongyuque-summer', name: '夏天的样子', types: ['飞', '火'], statsBonus: { atk: 15 } },
      { formId: 'dongyuque-autumn', name: '秋天的样子', types: ['飞', '地'], statsBonus: { def: 15 } },
      { formId: 'dongyuque-default', name: '默认样子', types: ['飞'], statsBonus: {} },
    ],
  },
  {
    id: 'lanniao',
    no: '020',
    name: '岚鸟',
    types: ['飞'],
    stats: { hp: 120, atk: 95, spa: 115, def: 95, spd: 105, spe: 130 },
    statsTotal: 660,
    ability: { name: '霜翼', desc: '冰系技能能耗-1，威力+10%' },
    category: '鸟类',
    evolution: { prev: 'dongyuque', next: null, stage: 3, isBoss: true },
    forms: [
      { formId: 'lanniao-spring', name: '春天的样子', types: ['飞', '草'], statsBonus: { spa: 20 } },
      { formId: 'lanniao-summer', name: '夏天的样子', types: ['飞', '火'], statsBonus: { atk: 20 } },
      { formId: 'lanniao-autumn', name: '秋天的样子', types: ['飞', '地'], statsBonus: { def: 20 } },
      { formId: 'lanniao-default', name: '默认样子', types: ['飞'], statsBonus: {} },
    ],
    description: '速度130的高速飞行精灵，可通过季节切换获得不同属性加成。',
  },

  // ===== 024-029 石肤蜥、布是石系列 =====
  {
    id: 'shifuxi',
    no: '024',
    name: '石肤蜥',
    types: ['地'],
    stats: { hp: 95, atk: 90, spa: 50, def: 95, spd: 75, spe: 50 },
    statsTotal: 455,
    ability: { name: '岩石皮肤', desc: '地系技能威力+20%' },
    category: '爬行类',
    evolution: { prev: null, next: 'shicixi', stage: 1 },
  },
  {
    id: 'shicixi',
    no: '025',
    name: '石刺蜥',
    types: ['地'],
    stats: { hp: 105, atk: 105, spa: 60, def: 110, spd: 85, spe: 55 },
    statsTotal: 520,
    ability: { name: '尖刺', desc: '受攻击时敌方物攻-15%' },
    category: '爬行类',
    evolution: { prev: 'shifuxi', next: 'shiguanwangxi', stage: 2 },
  },
  {
    id: 'shiguanwangxi',
    no: '026',
    name: '石冠王蜥',
    types: ['地'],
    stats: { hp: 120, atk: 120, spa: 65, def: 130, spd: 95, spe: 65 },
    statsTotal: 595,
    ability: { name: '王蜥铠甲', desc: '双防+30%' },
    category: '爬行类',
    evolution: { prev: 'shicixi', next: null, stage: 3, isBoss: true },
  },

  // ===== 027-029 布是岩系列 =====
  {
    id: 'bushishi',
    no: '027',
    name: '布是石',
    types: ['地'],
    stats: { hp: 100, atk: 80, spa: 80, def: 110, spd: 90, spe: 35 },
    statsTotal: 495,
    ability: { name: '布石', desc: '受攻击时物防+20%' },
    category: '拟人类',
    evolution: { prev: null, next: 'bushishiyan', stage: 1 },
  },
  {
    id: 'bushishiyan',
    no: '028',
    name: '布是岩',
    types: ['地'],
    stats: { hp: 110, atk: 95, spa: 95, def: 125, spd: 105, spe: 40 },
    statsTotal: 570,
    ability: { name: '岩壁', desc: '地系技能减伤20%' },
    category: '拟人类',
    evolution: { prev: 'bushishi', next: 'bukel', stage: 2 },
  },
  {
    id: 'bukel',
    no: '029',
    name: '布克棱岩',
    types: ['地'],
    stats: { hp: 130, atk: 100, spa: 100, def: 150, spd: 120, spe: 45 },
    statsTotal: 645,
    ability: { name: '棱镜折射', desc: '地系技能威力+30%' },
    category: '拟人类',
    evolution: { prev: 'bushishiyan', next: null, stage: 3, isBoss: true },
  },

  // ===== 030-031 恶魔叮系列（双属性） =====
  {
    id: 'emoding',
    no: '030',
    name: '恶魔叮',
    types: ['恶', '飞'],
    stats: { hp: 85, atk: 95, spa: 60, def: 70, spd: 70, spe: 105 },
    statsTotal: 485,
    ability: { name: '恶作剧', desc: '使用恶系技能时，10%概率敌方混乱' },
    category: '恶魔类',
    evolution: { prev: null, next: 'dingdingemo', stage: 1 },
  },
  {
    id: 'dingdingemo',
    no: '031',
    name: '叮叮恶魔',
    types: ['恶', '飞'],
    stats: { hp: 95, atk: 115, spa: 75, def: 80, spd: 85, spe: 125 },
    statsTotal: 575,
    ability: { name: '叮咬', desc: '先手+1' },
    category: '恶魔类',
    evolution: { prev: 'emoding', next: null, stage: 2, isBoss: true },
  },

  // ===== 032-034 化蝶进化链 - 4种球形态 =====
  {
    id: 'maomao',
    no: '032',
    name: '毛毛',
    types: ['虫', '萌'],
    stats: { hp: 90, atk: 65, spa: 65, def: 70, spd: 80, spe: 80 },
    statsTotal: 450,
    ability: { name: '绒毛', desc: '受攻击时减伤10%' },
    category: '虫类',
    evolution: { prev: null, next: 'papa', stage: 1 },
  },
  {
    id: 'papa',
    no: '033',
    name: '爬爬',
    types: ['虫', '萌'],
    stats: { hp: 100, atk: 75, spa: 80, def: 85, spd: 95, spe: 90 },
    statsTotal: 525,
    ability: { name: '黏液', desc: '敌方物攻-15%' },
    category: '虫类',
    evolution: { prev: 'maomao', next: 'huadie', stage: 2 },
  },
  {
    id: 'huadie',
    no: '034',
    name: '化蝶',
    types: ['虫', '萌'],
    stats: { hp: 110, atk: 85, spa: 130, def: 90, spd: 110, spe: 100 },
    statsTotal: 625,
    ability: { name: '鳞粉', desc: '受攻击时敌方魔攻-15%' },
    category: '虫类',
    evolution: { prev: 'papa', next: null, stage: 3, isBoss: true },
    forms: [
      { formId: 'huadie-normal', name: '平常的样子', types: ['虫', '萌'], statsBonus: {} },
      { formId: 'huadie-youming', name: '幽冥眼的样子', types: ['虫', '幽'], statsBonus: { spa: 20 } },
      { formId: 'huadie-miaomiao', name: '喵喵的样子', types: ['虫', '萌'], statsBonus: { hp: 20 } },
      { formId: 'huadie-qilihua', name: '奇丽花的样子', types: ['虫', '草'], statsBonus: { spd: 20 } },
    ],
    description: '高魔攻的虫萌双属性精灵，可解锁4种进化球形态，对应不同属性和资质加成。',
  },

  // ===== 035 幽影树（双属性） =====
  {
    id: 'youyingshu',
    no: '035',
    name: '幽影树',
    types: ['幽', '草'],
    stats: { hp: 100, atk: 90, spa: 110, def: 80, spd: 95, spe: 75 },
    statsTotal: 550,
    ability: { name: '幽林', desc: '使用草系技能时，附加幽系副伤害' },
    category: '植物类',
    evolution: { prev: null, next: 'huanyingjingji', stage: 1, isBoss: true },
  },
  {
    id: 'huanyingjingji',
    no: '035',
    name: '幻影荆棘',
    types: ['幽', '草'],
    stats: { hp: 120, atk: 110, spa: 130, def: 100, spd: 110, spe: 85 },
    statsTotal: 655,
    ability: { name: '荆棘反伤', desc: '受攻击时敌方受到10%生命反伤' },
    category: '植物类',
    evolution: { prev: null, next: null, stage: 1, isBoss: true },
  },

  // ===== 036-038 小鼠獭系列 =====
  {
    id: 'xiaoshuta',
    no: '036',
    name: '小鼠獭',
    types: ['普', '水'],
    stats: { hp: 90, atk: 75, spa: 65, def: 75, spd: 80, spe: 70 },
    statsTotal: 455,
    ability: { name: '水獭', desc: '每回合回复5%生命' },
    category: '水栖类',
    evolution: { prev: null, next: 'yanweita', stage: 1 },
  },
  {
    id: 'yanweita',
    no: '037',
    name: '燕尾獭',
    types: ['普', '水'],
    stats: { hp: 105, atk: 90, spa: 80, def: 95, spd: 100, spe: 95 },
    statsTotal: 565,
    ability: { name: '燕尾', desc: '速度+15%' },
    category: '水栖类',
    evolution: { prev: 'xiaoshuta', next: 'juanhujuta', stage: 2 },
  },
  {
    id: 'juanhujuta',
    no: '038',
    name: '卷胡巨獭',
    types: ['普', '水'],
    stats: { hp: 130, atk: 115, spa: 90, def: 120, spd: 115, spe: 110 },
    statsTotal: 680,
    ability: { name: '巨浪', desc: '水系技能威力+25%' },
    category: '水栖类',
    evolution: { prev: 'yanweita', next: null, stage: 3, isBoss: true },
  },

  // ===== 039-040 矿晶虫、晶石蜗 - 6种矿石形态 =====
  {
    id: 'kuangjingchong',
    no: '039',
    name: '矿晶虫',
    types: ['光', '地'],
    stats: { hp: 80, atk: 60, spa: 80, def: 95, spd: 95, spe: 50 },
    statsTotal: 460,
    ability: { name: '晶矿', desc: '受攻击时双防+10%' },
    category: '虫类',
    evolution: { prev: null, next: 'jingshiwo', stage: 1 },
  },
  {
    id: 'jingshiwo',
    no: '040',
    name: '晶石蜗',
    types: ['光', '地'],
    stats: { hp: 95, atk: 75, spa: 100, def: 120, spd: 115, spe: 60 },
    statsTotal: 565,
    ability: { name: '宝石折射', desc: '光系技能威力+20%' },
    category: '虫类',
    evolution: { prev: 'kuangjingchong', next: 'zhuanshiwo', stage: 2 },
    forms: [
      { formId: 'jingshiwo-tourmaline', name: '西瓜碧玺', types: ['光', '地'], statsBonus: { spa: 15 } },
      { formId: 'jingshiwo-ruby', name: '莲花刚玉', types: ['光', '火'], statsBonus: { atk: 15 } },
      { formId: 'jingshiwo-garnet', name: '星彩榴石', types: ['光', '地'], statsBonus: { def: 15 } },
      { formId: 'jingshiwo-volcanic', name: '火山琉璃', types: ['光', '火'], statsBonus: { spa: 10, atk: 10 } },
      { formId: 'jingshiwo-benitoite', name: '蓝锥矿', types: ['光', '水'], statsBonus: { spd: 15 } },
      { formId: 'jingshiwo-gold', name: '烧蓝黄金', types: ['光', '钢'], statsBonus: { hp: 15, def: 10 } },
    ],
  },
  {
    id: 'zhuanshiwo',
    no: '040',
    name: '钻石蜗',
    types: ['光', '地'],
    stats: { hp: 110, atk: 90, spa: 120, def: 145, spd: 135, spe: 70 },
    statsTotal: 670,
    ability: { name: '钻石之心', desc: '受致命伤时保留1点生命，每场1次' },
    category: '虫类',
    evolution: { prev: 'jingshiwo', next: null, stage: 3, isBoss: true },
    forms: [
      { formId: 'zhuanshiwo-tourmaline', name: '西瓜碧玺', types: ['光', '地'], statsBonus: { spa: 25 } },
      { formId: 'zhuanshiwo-ruby', name: '莲花刚玉', types: ['光', '火'], statsBonus: { atk: 25 } },
      { formId: 'zhuanshiwo-garnet', name: '星彩榴石', types: ['光', '地'], statsBonus: { def: 25 } },
      { formId: 'zhuanshiwo-volcanic', name: '火山琉璃', types: ['光', '火'], statsBonus: { spa: 15, atk: 15 } },
      { formId: 'zhuanshiwo-benitoite', name: '蓝锥矿', types: ['光', '水'], statsBonus: { spd: 25 } },
      { formId: 'zhuanshiwo-gold', name: '烧蓝黄金', types: ['光', '钢'], statsBonus: { hp: 25, def: 15 } },
    ],
    description: '极限物防（145）+魔防（135）坦克，可解锁6种矿石主题形态。',
  },

  // ===== 041-043 奇丽花进化链 =====
  {
    id: 'qilicao',
    no: '041',
    name: '奇丽草',
    types: ['草'],
    stats: { hp: 85, atk: 70, spa: 85, def: 70, spd: 85, spe: 60 },
    statsTotal: 455,
    ability: { name: '叶绿光束', desc: '草系技能威力+10%' },
    category: '植物类',
    evolution: { prev: null, next: 'qiliye', stage: 1 },
  },
  {
    id: 'qiliye',
    no: '042',
    name: '奇丽叶',
    types: ['草'],
    stats: { hp: 95, atk: 80, spa: 100, def: 80, spd: 100, spe: 65 },
    statsTotal: 520,
    ability: { name: '花瓣', desc: '每回合回复5%生命' },
    category: '植物类',
    evolution: { prev: 'qilicao', next: 'qilihua', stage: 2 },
  },
  {
    id: 'qilihua',
    no: '043',
    name: '奇丽花',
    types: ['草'],
    stats: { hp: 110, atk: 90, spa: 120, def: 90, spd: 120, spe: 80 },
    statsTotal: 610,
    ability: { name: '盛开', desc: '满血时草系技能威力+20%' },
    category: '植物类',
    evolution: { prev: 'qiliye', next: null, stage: 3, isBoss: true },
  },

  // ===== 044-046 丢丢进化链 - 3种地域形态（卡瓦重是手游招牌） =====
  {
    id: 'diudiu',
    no: '044',
    name: '丢丢',
    types: ['草'],
    stats: { hp: 90, atk: 70, spa: 70, def: 80, spd: 80, spe: 60 },
    statsTotal: 450,
    ability: { name: '适应环境', desc: '在不同地貌可切换形态' },
    category: '拟人类',
    evolution: { prev: null, next: 'kakachong', stage: 1 },
    forms: [
      { formId: 'diudiu-grass', name: '草地附近', types: ['草'], statsBonus: { spd: 10 } },
      { formId: 'diudiu-sand', name: '沙地附近', types: ['草', '地'], statsBonus: { def: 10 } },
      { formId: 'diudiu-snow', name: '雪山附近', types: ['草', '冰'], statsBonus: { spa: 10 } },
    ],
  },
  {
    id: 'kakachong',
    no: '045',
    name: '卡卡虫',
    types: ['草'],
    stats: { hp: 100, atk: 85, spa: 90, def: 95, spd: 95, spe: 70 },
    statsTotal: 535,
    ability: { name: '伪装', desc: '首次受攻击减伤30%' },
    category: '虫类',
    evolution: { prev: 'diudiu', next: 'kawachong', stage: 2 },
    forms: [
      { formId: 'kakachong-grass', name: '草地形态', types: ['草'], statsBonus: { spd: 15 } },
      { formId: 'kakachong-sand', name: '沙地形态', types: ['草', '地'], statsBonus: { def: 15 } },
      { formId: 'kakachong-snow', name: '雪山形态', types: ['草', '冰'], statsBonus: { spa: 15 } },
    ],
  },
  {
    id: 'kawachong',
    no: '046',
    name: '卡瓦重',
    types: ['草'],
    stats: { hp: 120, atk: 95, spa: 115, def: 115, spd: 115, spe: 85 },
    statsTotal: 645,
    ability: { name: '生态适应', desc: '形态属性对应的技能威力+25%' },
    category: '拟人类',
    evolution: { prev: 'kakachong', next: null, stage: 3, isBoss: true },
    forms: [
      { formId: 'kawachong-grass', name: '草之卡瓦重', types: ['草'], statsBonus: { spd: 20 } },
      { formId: 'kawachong-sand', name: '地之卡瓦重', types: ['草', '地'], statsBonus: { def: 20, atk: 10 } },
      { formId: 'kawachong-snow', name: '冰之卡瓦重', types: ['草', '冰'], statsBonus: { spa: 20 } },
    ],
    description: '手游招牌精灵，三种地域形态分别对应不同属性组合，可通过游戏内地图切换。',
  },

  // ===== 047-048 护主犬 =====
  {
    id: 'huzhujun',
    no: '047',
    name: '护主犬',
    types: ['火'],
    stats: { hp: 95, atk: 90, spa: 65, def: 80, spd: 75, spe: 85 },
    statsTotal: 490,
    ability: { name: '守护', desc: '保护队友时减伤30%' },
    category: '犬类',
    evolution: { prev: null, next: 'yinsu', stage: 1 },
  },
  {
    id: 'yinsu',
    no: '048',
    name: '音速犬',
    types: ['火'],
    stats: { hp: 110, atk: 120, spa: 80, def: 95, spd: 90, spe: 120 },
    statsTotal: 615,
    ability: { name: '音速', desc: '速度+25%' },
    category: '犬类',
    evolution: { prev: 'huzhujun', next: 'fengbaozhann', stage: 2 },
  },
  {
    id: 'fengbaozhann',
    no: '048',
    name: '风暴战犬',
    types: ['火'],
    stats: { hp: 125, atk: 140, spa: 90, def: 105, spd: 100, spe: 135 },
    statsTotal: 695,
    ability: { name: '风暴烈焰', desc: '火系技能附带先手+1' },
    category: '犬类',
    evolution: { prev: 'yinsu', next: null, stage: 3, isBoss: true },
  },

  // ===== 049-051 松鼠系列 =====
  {
    id: 'lv-ersongshu',
    no: '049',
    name: '绿耳松鼠',
    types: ['普'],
    stats: { hp: 90, atk: 75, spa: 50, def: 75, spd: 75, spe: 100 },
    statsTotal: 465,
    ability: { name: '松果', desc: '速度+10%' },
    category: '鼠类',
    evolution: { prev: null, next: 'baozhensongshu', stage: 1 },
  },
  {
    id: 'baozhensongshu',
    no: '050',
    name: '抱枕松鼠',
    types: ['普'],
    stats: { hp: 105, atk: 90, spa: 60, def: 95, spd: 95, spe: 120 },
    statsTotal: 565,
    ability: { name: '弹跳', desc: '速度+20%' },
    category: '鼠类',
    evolution: { prev: 'lv-ersongshu', next: 'bengchuangsongshu', stage: 2 },
  },
  {
    id: 'bengchuangsongshu',
    no: '051',
    name: '蹦床松鼠',
    types: ['普'],
    stats: { hp: 120, atk: 105, spa: 70, def: 110, spd: 110, spe: 145 },
    statsTotal: 660,
    ability: { name: '超级弹跳', desc: '速度+30%，闪避+15%' },
    category: '鼠类',
    evolution: { prev: 'baozhensongshu', next: null, stage: 3, isBoss: true },
  },

  // ===== 052-053 嘟嘟煲 =====
  {
    id: 'dudubao',
    no: '052',
    name: '嘟嘟煲',
    types: ['毒'],
    stats: { hp: 100, atk: 65, spa: 90, def: 80, spd: 80, spe: 60 },
    statsTotal: 475,
    ability: { name: '毒雾', desc: '出场时敌方中毒' },
    category: '拟人类',
    evolution: { prev: null, next: 'duduguo', stage: 1 },
  },
  {
    id: 'duduguo',
    no: '053',
    name: '嘟嘟锅',
    types: ['毒'],
    stats: { hp: 115, atk: 80, spa: 110, def: 95, spd: 95, spe: 70 },
    statsTotal: 565,
    ability: { name: '剧毒', desc: '中毒伤害+50%' },
    category: '拟人类',
    evolution: { prev: 'dudubao', next: null, stage: 2, isBoss: true },
  },

  // ===== 054-056 小灵面进化链 =====
  {
    id: 'xiaolingmian',
    no: '054',
    name: '小灵面',
    types: ['幽'],
    stats: { hp: 80, atk: 60, spa: 95, def: 70, spd: 90, spe: 85 },
    statsTotal: 480,
    ability: { name: '灵视', desc: '幽系技能威力+15%' },
    category: '幽冥类',
    evolution: { prev: null, next: 'anyinglingmian', stage: 1 },
  },
  {
    id: 'anyinglingmian',
    no: '055',
    name: '暗影灵面',
    types: ['幽'],
    stats: { hp: 95, atk: 75, spa: 115, def: 80, spd: 105, spe: 100 },
    statsTotal: 570,
    ability: { name: '影子', desc: '闪避+20%' },
    category: '幽冥类',
    evolution: { prev: 'xiaolingmian', next: 'youmingeye', stage: 2 },
    forms: [
      { formId: 'anyinglingmian-closed', name: '闭眼形态', types: ['幽'], statsBonus: { spd: 15 } },
      { formId: 'anyinglingmian-open', name: '睁眼形态', types: ['幽'], statsBonus: { spa: 15 } },
    ],
  },
  {
    id: 'youmingeye',
    no: '056',
    name: '幽冥眼',
    types: ['幽'],
    stats: { hp: 110, atk: 85, spa: 145, def: 90, spd: 120, spe: 115 },
    statsTotal: 665,
    ability: { name: '凝视', desc: '魔攻+20%，使用魔攻技能时敌方魔防-10%' },
    category: '幽冥类',
    evolution: { prev: 'anyinglingmian', next: null, stage: 3, isBoss: true },
    forms: [
      { formId: 'youmingeye-closed', name: '闭眼形态', types: ['幽'], statsBonus: { spd: 25 } },
      { formId: 'youmingeye-open', name: '睁眼形态', types: ['幽'], statsBonus: { spa: 25 } },
    ],
    description: '高魔攻(145)+速度(115)的幽系核心输出，睁眼形态魔攻更高。',
  },

  // ===== 057-058 梦游 =====
  {
    id: 'mengyou',
    no: '057',
    name: '梦游',
    types: ['幽'],
    stats: { hp: 90, atk: 60, spa: 100, def: 80, spd: 100, spe: 70 },
    statsTotal: 500,
    ability: { name: '梦魇', desc: '使敌方睡眠2回合' },
    category: '幽冥类',
    evolution: { prev: null, next: 'mengyouyou', stage: 1 },
  },
  {
    id: 'mengyouyou',
    no: '058',
    name: '梦悠悠',
    types: ['幽'],
    stats: { hp: 105, atk: 70, spa: 125, def: 95, spd: 120, spe: 85 },
    statsTotal: 600,
    ability: { name: '深度睡眠', desc: '敌方睡眠回合+1' },
    category: '幽冥类',
    evolution: { prev: 'mengyou', next: null, stage: 2, isBoss: true },
  },

  // ===== 059 兽花蕾（双属性） =====
  {
    id: 'shouhuale',
    no: '059',
    name: '兽花蕾',
    types: ['光', '草'],
    stats: { hp: 105, atk: 80, spa: 100, def: 95, spd: 110, spe: 75 },
    statsTotal: 565,
    ability: { name: '花苞', desc: '每回合回复8%生命' },
    category: '植物类',
    evolution: { prev: null, next: null, stage: 1 },
  },

  // ===== 060-062 鼹鼠进化链 =====
  {
    id: 'fudishou',
    no: '060',
    name: '伏地兽',
    types: ['普'],
    stats: { hp: 100, atk: 90, spa: 50, def: 95, spd: 70, spe: 65 },
    statsTotal: 470,
    ability: { name: '挖洞', desc: '物攻+15%，首回合必先手' },
    category: '鼠类',
    evolution: { prev: null, next: 'tanshiyan', stage: 1 },
  },
  {
    id: 'tanshiyan',
    no: '061',
    name: '贪食鼹',
    types: ['普'],
    stats: { hp: 115, atk: 110, spa: 60, def: 110, spd: 85, spe: 80 },
    statsTotal: 560,
    ability: { name: '贪食', desc: '击杀后回复30%生命' },
    category: '鼠类',
    evolution: { prev: 'fudishou', next: 'jushizhenyan', stage: 2 },
  },
  {
    id: 'jushizhenyan',
    no: '062',
    name: '巨噬针鼹',
    types: ['普'],
    stats: { hp: 130, atk: 140, spa: 70, def: 130, spd: 95, spe: 95 },
    statsTotal: 660,
    ability: { name: '巨噬', desc: '物攻+30%' },
    category: '鼠类',
    evolution: { prev: 'tanshiyan', next: null, stage: 3, isBoss: true },
  },

  // ===== 063-064 蹦蹦种子进化链 - 4种球形态 =====
  {
    id: 'bengbengzhongzi',
    no: '063',
    name: '蹦蹦种子',
    types: ['草', '毒'],
    stats: { hp: 85, atk: 65, spa: 85, def: 80, spd: 80, spe: 65 },
    statsTotal: 460,
    ability: { name: '孢子', desc: '出场时敌方中毒' },
    category: '植物类',
    evolution: { prev: null, next: 'bengbengcao', stage: 1 },
    forms: [
      { formId: 'bengbengzhongzi-haishenqiu', name: '海神球', types: ['草', '水'], statsBonus: { spd: 10 } },
      { formId: 'bengbengzhongzi-caiyuqiu', name: '彩玉球', types: ['草', '萌'], statsBonus: { spa: 10 } },
      { formId: 'bengbengzhongzi-duanmaoqiu', name: '短毛球', types: ['草', '毒'], statsBonus: { atk: 10 } },
      { formId: 'bengbengzhongzi-xiangyaqiu', name: '象牙球', types: ['草', '普'], statsBonus: { def: 10 } },
    ],
  },
  {
    id: 'bengbengcao',
    no: '064',
    name: '蹦蹦草',
    types: ['草', '毒'],
    stats: { hp: 100, atk: 80, spa: 105, def: 95, spd: 95, spe: 75 },
    statsTotal: 550,
    ability: { name: '毒孢子', desc: '草系技能附带中毒' },
    category: '植物类',
    evolution: { prev: 'bengbengzhongzi', next: null, stage: 2, isBoss: true },
    forms: [
      { formId: 'bengbengcao-haishenqiu', name: '海神球', types: ['草', '水'], statsBonus: { spd: 20 } },
      { formId: 'bengbengcao-caiyuqiu', name: '彩玉球', types: ['草', '萌'], statsBonus: { spa: 20 } },
      { formId: 'bengbengcao-duanmaoqiu', name: '短毛球', types: ['草', '毒'], statsBonus: { atk: 20 } },
      { formId: 'bengbengcao-xiangyaqiu', name: '象牙球', types: ['草', '普'], statsBonus: { def: 20 } },
    ],
  },

  // ===== 075 瞌睡王 =====
  {
    id: 'keshuiwang',
    no: '075',
    name: '瞌睡王',
    types: ['普', '武'],
    stats: { hp: 144, atk: 157, spa: 64, def: 135, spd: 110, spe: 75 },
    statsTotal: 685,
    ability: { name: '慢热型', desc: '初始能量为0，入场前己方精灵每成功应对1次，回复5能量' },
    category: '自然类',
    evolution: { prev: 'dongliyuan', next: null, stage: 3, isBoss: true },
    height: '1.61~2.31M',
    weight: '124.5~136.5KG',
    price: 6000,
    starlight: 80,
    description: '手游高资质(685)物攻型精灵，生命144+物攻157+物防135肉到离谱。',
  },
  {
    id: 'bafalanren',
    no: '075',
    name: '白发懒人',
    types: ['普'],
    stats: { hp: 120, atk: 110, spa: 50, def: 100, spd: 80, spe: 50 },
    statsTotal: 510,
    ability: { name: '慢热', desc: '速度-30%，每回合物攻+10%' },
    category: '自然类',
    evolution: { prev: null, next: 'dongliyuan', stage: 1 },
  },
  {
    id: 'dongliyuan',
    no: '075',
    name: '动力猿',
    types: ['普', '武'],
    stats: { hp: 130, atk: 135, spa: 55, def: 115, spd: 95, spe: 65 },
    statsTotal: 595,
    ability: { name: '动力觉醒', desc: '生命低于50%时物攻+25%' },
    category: '自然类',
    evolution: { prev: 'bafalanren', next: 'keshuiwang', stage: 2 },
  },
];

/**
 * 根据ID获取精灵
 */
function getPetById(id) {
  return PETS.find((p) => p.id === id);
}

/**
 * 根据名称模糊搜索
 */
function searchPets(keyword) {
  if (!keyword) return PETS;
  const kw = keyword.toLowerCase();
  return PETS.filter(
    (p) => p.name.includes(keyword) || p.id.toLowerCase().includes(kw) || p.no.includes(keyword),
  );
}

/**
 * 列出精灵（支持分页、筛选、排序）
 */
function listPets({ page = 1, pageSize = 20, type, sortBy = 'no' } = {}) {
  let result = PETS;

  // 按属性筛选
  if (type) {
    result = result.filter((p) => p.types.includes(type));
  }

  // 排序
  if (sortBy === 'no') {
    result = [...result].sort((a, b) => Number(a.no) - Number(b.no));
  } else if (sortBy === 'total') {
    result = [...result].sort((a, b) => b.statsTotal - a.statsTotal);
  } else if (sortBy === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  }

  // 分页
  const total = result.length;
  const start = (page - 1) * pageSize;
  const items = result.slice(start, start + pageSize);

  return { items, total, page, pageSize };
}

/**
 * 获取进化链
 */
function getEvolutionChain(petId) {
  const pet = getPetById(petId);
  if (!pet) return null;

  const chain = [];
  // 向前追溯
  let current = pet;
  while (current) {
    chain.unshift(current);
    if (current.evolution?.prev) {
      current = getPetById(current.evolution.prev);
    } else {
      break;
    }
  }
  // 向后追溯
  current = pet;
  while (current) {
    if (chain.find((p) => p.id === current.id) && current !== pet) break;
    if (current !== pet) chain.push(current);
    if (current.evolution?.next) {
      current = getPetById(current.evolution.next);
    } else {
      break;
    }
  }
  return chain;
}

module.exports = {
  PETS,
  getPetById,
  searchPets,
  listPets,
  getEvolutionChain,
};
