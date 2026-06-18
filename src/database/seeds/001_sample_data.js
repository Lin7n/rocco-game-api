exports.seed = async function (knex) {
  await knex('pet_tags').del();
  await knex('tags').del();
  await knex('type_effectiveness').del();
  await knex('team_members').del();
  await knex('teams').del();
  await knex('pet_skills').del();
  await knex('skills').del();
  await knex('guides').del();
  await knex('pets').del();

  const TYPE_MAP = {
    normal: '普通', fire: '火', water: '水', grass: '草', electric: '电',
    ice: '冰', fighting: '格斗', poison: '毒', ground: '地面', flying: '飞行',
    psychic: '超能', bug: '虫', rock: '岩石', ghost: '幽灵', dragon: '龙',
    dark: '恶', steel: '钢', fairy: '妖精',
  };

  // ========== 精灵数据 ==========
  const pets = [
    { national_id: 1, name: '妙蛙种子', name_en: 'Bulbasaur', rarity: 'common', primary_type: 'grass', secondary_type: 'poison', description: '出生时背上就背着种子。种子会随着身体一起长大。', category: '种子精灵', generation: '第一世代', base_hp: 45, base_attack: 49, base_defense: 49, base_sp_attack: 65, base_sp_defense: 65, base_speed: 45, base_total: 318, meta_score: 55.0, evolution_chain_id: 1, evolution_stage: 1, evolution_method: '等级16进化', evolves_to_id: 2 },
    { national_id: 2, name: '妙蛙草', name_en: 'Ivysaur', rarity: 'uncommon', primary_type: 'grass', secondary_type: 'poison', description: '背上的花苞长大，无法用两脚站立。', category: '种子精灵', generation: '第一世代', base_hp: 60, base_attack: 62, base_defense: 63, base_sp_attack: 80, base_sp_defense: 80, base_speed: 60, base_total: 405, meta_score: 65.0, evolution_chain_id: 1, evolution_stage: 2, evolution_method: '等级32进化', evolves_from_id: 1, evolves_to_id: 3 },
    { national_id: 3, name: '妙蛙花', name_en: 'Venusaur', rarity: 'rare', primary_type: 'grass', secondary_type: 'poison', description: '背上的花吸收阳光后，花朵散发令人平静的香气。', category: '种子精灵', generation: '第一世代', base_hp: 80, base_attack: 82, base_defense: 83, base_sp_attack: 100, base_sp_defense: 100, base_speed: 80, base_total: 525, meta_score: 78.0, evolution_chain_id: 1, evolution_stage: 3, evolves_from_id: 2 },
    { national_id: 4, name: '小火龙', name_en: 'Charmander', rarity: 'common', primary_type: 'fire', secondary_type: null, description: '尾巴上的火焰是生命力的表现。精神好的时候火焰旺盛燃烧。', category: '蜥蜴精灵', generation: '第一世代', base_hp: 39, base_attack: 52, base_defense: 43, base_sp_attack: 60, base_sp_defense: 50, base_speed: 65, base_total: 309, meta_score: 57.0, evolution_chain_id: 2, evolution_stage: 1, evolution_method: '等级16进化', evolves_to_id: 5 },
    { national_id: 5, name: '火恐龙', name_en: 'Charmeleon', rarity: 'uncommon', primary_type: 'fire', secondary_type: null, description: '战斗时尾巴的火焰会剧烈燃烧，用利爪撕裂敌人。', category: '火焰精灵', generation: '第一世代', base_hp: 58, base_attack: 64, base_defense: 58, base_sp_attack: 80, base_sp_defense: 65, base_speed: 80, base_total: 405, meta_score: 66.0, evolution_chain_id: 2, evolution_stage: 2, evolution_method: '等级36进化', evolves_from_id: 4, evolves_to_id: 6 },
    { national_id: 6, name: '喷火龙', name_en: 'Charizard', rarity: 'rare', primary_type: 'fire', secondary_type: 'flying', description: '喷出能将巨石烧毁的灼热火焰，有时会引发森林火灾。', category: '火焰精灵', generation: '第一世代', base_hp: 78, base_attack: 84, base_defense: 78, base_sp_attack: 109, base_sp_defense: 85, base_speed: 100, base_total: 534, meta_score: 82.0, evolution_chain_id: 2, evolution_stage: 3, evolves_from_id: 5 },
    { national_id: 7, name: '杰尼龟', name_en: 'Squirtle', rarity: 'common', primary_type: 'water', secondary_type: null, description: '龟壳不仅是保护身体的盔甲，圆润的形状还能减少水的阻力。', category: '小龟精灵', generation: '第一世代', base_hp: 44, base_attack: 48, base_defense: 65, base_sp_attack: 50, base_sp_defense: 64, base_speed: 43, base_total: 314, meta_score: 56.0, evolution_chain_id: 3, evolution_stage: 1, evolution_method: '等级16进化', evolves_to_id: 8 },
    { national_id: 8, name: '卡咪龟', name_en: 'Wartortle', rarity: 'uncommon', primary_type: 'water', secondary_type: null, description: '蓬松的尾巴和耳朵是长寿的象征，据说能活一万年。', category: '龟精灵', generation: '第一世代', base_hp: 59, base_attack: 63, base_defense: 80, base_sp_attack: 65, base_sp_defense: 80, base_speed: 58, base_total: 405, meta_score: 64.0, evolution_chain_id: 3, evolution_stage: 2, evolution_method: '等级36进化', evolves_from_id: 7, evolves_to_id: 9 },
    { national_id: 9, name: '水箭龟', name_en: 'Blastoise', rarity: 'rare', primary_type: 'water', secondary_type: null, description: '甲壳上的水炮射程可达50米，能精准命中远处的敌人。', category: '甲壳精灵', generation: '第一世代', base_hp: 79, base_attack: 83, base_defense: 100, base_sp_attack: 85, base_sp_defense: 105, base_speed: 78, base_total: 530, meta_score: 79.0, evolution_chain_id: 3, evolution_stage: 3, evolves_from_id: 8 },
    { national_id: 25, name: '皮卡丘', name_en: 'Pikachu', rarity: 'uncommon', primary_type: 'electric', secondary_type: null, description: '脸颊的电气袋储存电力。生气时电力会瞬间释放。', category: '鼠精灵', generation: '第一世代', base_hp: 35, base_attack: 55, base_defense: 40, base_sp_attack: 50, base_sp_defense: 50, base_speed: 90, base_total: 320, meta_score: 72.0, evolution_chain_id: 5, evolution_stage: 2, evolves_from_id: 172 },
    { national_id: 150, name: '超梦', name_en: 'Mewtwo', rarity: 'mythical', primary_type: 'psychic', secondary_type: null, description: '基因工程创造的精灵，拥有所有精灵中最残暴的心。', category: '基因精灵', generation: '第一世代', base_hp: 106, base_attack: 110, base_defense: 90, base_sp_attack: 154, base_sp_defense: 90, base_speed: 130, base_total: 680, meta_score: 98.0 },
    { national_id: 151, name: '梦幻', name_en: 'Mew', rarity: 'mythical', primary_type: 'psychic', secondary_type: null, description: '据说拥有所有精灵的基因，能学会所有技能。', category: '新种精灵', generation: '第一世代', base_hp: 100, base_attack: 100, base_defense: 100, base_sp_attack: 100, base_sp_defense: 100, base_speed: 100, base_total: 600, meta_score: 95.0 },
  ];

  const petIds = await knex('pets').insert(pets).returning('id');

  // ========== 技能数据 ==========
  const skills = [
    { name: '撞击', name_en: 'Tackle', type: 'normal', category: 'physical', power: 40, accuracy: 100, pp: 35, max_pp: 56, description: '用整个身体撞向对手进行攻击。', priority: 0 },
    { name: '飞叶快刀', name_en: 'Razor Leaf', type: 'grass', category: 'physical', power: 55, accuracy: 95, pp: 25, max_pp: 40, description: '飞出锋利的叶片切向对手。容易击中要害。', priority: 0, effect: '容易击中要害，命中要害等级+1', effect_chance: 100 },
    { name: '阳光烈焰', name_en: 'Solar Beam', type: 'grass', category: 'special', power: 120, accuracy: 100, pp: 10, max_pp: 16, description: '第一回合收集阳光，第二回合发射光束攻击。', priority: 0, effect: '需要一回合蓄力（晴天无需蓄力）' },
    { name: '火花', name_en: 'Ember', type: 'fire', category: 'special', power: 40, accuracy: 100, pp: 25, max_pp: 40, description: '向对手发射小火焰攻击。有时会让对手灼伤。', priority: 0, effect: '10%几率使目标灼伤', effect_chance: 10 },
    { name: '喷射火焰', name_en: 'Flamethrower', type: 'fire', category: 'special', power: 90, accuracy: 100, pp: 15, max_pp: 24, description: '向对手喷射烈焰。有时会让对手灼伤。', priority: 0, effect: '10%几率使目标灼伤', effect_chance: 10 },
    { name: '大字爆炎', name_en: 'Fire Blast', type: 'fire', category: 'special', power: 110, accuracy: 85, pp: 5, max_pp: 8, description: '用大字形状的火焰烧尽对手。有时会让对手灼伤。', priority: 0, effect: '10%几率使目标灼伤', effect_chance: 10 },
    { name: '水枪', name_en: 'Water Gun', type: 'water', category: 'special', power: 40, accuracy: 100, pp: 25, max_pp: 40, description: '向对手猛烈喷射水柱进行攻击。', priority: 0 },
    { name: '冲浪', name_en: 'Surf', type: 'water', category: 'special', power: 90, accuracy: 100, pp: 15, max_pp: 24, description: '用巨浪攻击周围所有精灵。', priority: 0, target: 'all_foes' },
    { name: '水炮', name_en: 'Hydro Pump', type: 'water', category: 'special', power: 110, accuracy: 80, pp: 5, max_pp: 8, description: '猛烈喷射大量水流攻击对手。', priority: 0 },
    { name: '十万伏特', name_en: 'Thunderbolt', type: 'electric', category: 'special', power: 90, accuracy: 100, pp: 15, max_pp: 24, description: '向对手发出强力电击。有时会让对手麻痹。', priority: 0, effect: '10%几率使目标麻痹', effect_chance: 10 },
    { name: '打雷', name_en: 'Thunder', type: 'electric', category: 'special', power: 110, accuracy: 70, pp: 10, max_pp: 16, description: '向对手劈下暴雷。有时会让对手麻痹。雨天必中。', priority: 0, effect: '30%几率使目标麻痹；雨天必中；晴天命中率降为50%', effect_chance: 30 },
    { name: '精神强念', name_en: 'Psychic', type: 'psychic', category: 'special', power: 90, accuracy: 100, pp: 10, max_pp: 16, description: '向对手发送强大的念力攻击。有时会降低特防。', priority: 0, effect: '10%几率降低目标特防1级', effect_chance: 10 },
    { name: '波导弹', name_en: 'Aura Sphere', type: 'fighting', category: 'special', power: 80, accuracy: 100, pp: 20, max_pp: 32, description: '从体内发出波导之力攻击。攻击必定命中。', priority: 0 },
    { name: '龙之波动', name_en: 'Dragon Pulse', type: 'dragon', category: 'special', power: 85, accuracy: 100, pp: 10, max_pp: 16, description: '从口中喷射冲击波攻击对手。', priority: 0 },
    { name: '暗影球', name_en: 'Shadow Ball', type: 'ghost', category: 'special', power: 80, accuracy: 100, pp: 15, max_pp: 24, description: '投掷一团黑影攻击。有时会降低对手特防。', priority: 0, effect: '20%几率降低目标特防1级', effect_chance: 20 },
    { name: '地震', name_en: 'Earthquake', type: 'ground', category: 'physical', power: 100, accuracy: 100, pp: 10, max_pp: 16, description: '引发地震攻击周围所有精灵。', priority: 0, target: 'all_foes' },
    { name: '剑舞', name_en: 'Swords Dance', type: 'normal', category: 'status', power: null, accuracy: null, pp: 20, max_pp: 32, description: '激烈地跳战斗之舞提升气势。大幅提高攻击。', priority: 0, target: 'self', effect: '攻击+2级' },
    { name: '冥想', name_en: 'Calm Mind', type: 'psychic', category: 'status', power: null, accuracy: null, pp: 20, max_pp: 32, description: '静心凝神提高精神力量。提高特攻和特防。', priority: 0, target: 'self', effect: '特攻+1级，特防+1级' },
    { name: '自我再生', name_en: 'Recover', type: 'normal', category: 'status', power: null, accuracy: null, pp: 5, max_pp: 8, description: '让细胞再生，恢复最大HP的一半。', priority: 0, target: 'self', effect: '回复最大HP的50%' },
    { name: '龙之舞', name_en: 'Dragon Dance', type: 'dragon', category: 'status', power: null, accuracy: null, pp: 20, max_pp: 32, description: '神秘地跳起龙之舞。提高攻击和速度。', priority: 0, target: 'self', effect: '攻击+1级，速度+1级' },
  ];

  const skillIds = await knex('skills').insert(skills).returning('id');

  // ========== 精灵技能关联 ==========
  const petSkills = [
    { pet_id: petIds[0].id, skill_id: skillIds[0].id, learn_method: 'level_up', level_learned: 1 },
    { pet_id: petIds[0].id, skill_id: skillIds[1].id, learn_method: 'level_up', level_learned: 12 },
    { pet_id: petIds[2].id, skill_id: skillIds[2].id, learn_method: 'level_up', level_learned: 58 },
    { pet_id: petIds[3].id, skill_id: skillIds[3].id, learn_method: 'level_up', level_learned: 1 },
    { pet_id: petIds[5].id, skill_id: skillIds[4].id, learn_method: 'level_up', level_learned: 30 },
    { pet_id: petIds[5].id, skill_id: skillIds[5].id, learn_method: 'level_up', level_learned: 54 },
    { pet_id: petIds[5].id, skill_id: skillIds[16].id, learn_method: 'tm', level_learned: null },
    { pet_id: petIds[5].id, skill_id: skillIds[19].id, learn_method: 'egg', level_learned: null },
    { pet_id: petIds[6].id, skill_id: skillIds[6].id, learn_method: 'level_up', level_learned: 1 },
    { pet_id: petIds[8].id, skill_id: skillIds[7].id, learn_method: 'tm', level_learned: null },
    { pet_id: petIds[8].id, skill_id: skillIds[8].id, learn_method: 'level_up', level_learned: 49 },
    { pet_id: petIds[9].id, skill_id: skillIds[9].id, learn_method: 'level_up', level_learned: 28 },
    { pet_id: petIds[9].id, skill_id: skillIds[10].id, learn_method: 'tm', level_learned: null },
    { pet_id: petIds[10].id, skill_id: skillIds[11].id, learn_method: 'level_up', level_learned: 66 },
    { pet_id: petIds[10].id, skill_id: skillIds[12].id, learn_method: 'tm', level_learned: null },
    { pet_id: petIds[10].id, skill_id: skillIds[14].id, learn_method: 'tm', level_learned: null },
    { pet_id: petIds[10].id, skill_id: skillIds[17].id, learn_method: 'level_up', level_learned: 41 },
    { pet_id: petIds[10].id, skill_id: skillIds[18].id, learn_method: 'level_up', level_learned: 55 },
  ];

  await knex('pet_skills').insert(petSkills);

  // ========== 属性克制表 ==========
  const effectiveness = [
    { attack_type: 'fire', defend_type: 'grass', multiplier: 2 },
    { attack_type: 'fire', defend_type: 'ice', multiplier: 2 },
    { attack_type: 'fire', defend_type: 'bug', multiplier: 2 },
    { attack_type: 'fire', defend_type: 'steel', multiplier: 2 },
    { attack_type: 'fire', defend_type: 'water', multiplier: 0.5 },
    { attack_type: 'fire', defend_type: 'rock', multiplier: 0.5 },
    { attack_type: 'fire', defend_type: 'dragon', multiplier: 0.5 },
    { attack_type: 'water', defend_type: 'fire', multiplier: 2 },
    { attack_type: 'water', defend_type: 'ground', multiplier: 2 },
    { attack_type: 'water', defend_type: 'rock', multiplier: 2 },
    { attack_type: 'water', defend_type: 'grass', multiplier: 0.5 },
    { attack_type: 'water', defend_type: 'dragon', multiplier: 0.5 },
    { attack_type: 'grass', defend_type: 'water', multiplier: 2 },
    { attack_type: 'grass', defend_type: 'ground', multiplier: 2 },
    { attack_type: 'grass', defend_type: 'rock', multiplier: 2 },
    { attack_type: 'grass', defend_type: 'fire', multiplier: 0.5 },
    { attack_type: 'grass', defend_type: 'flying', multiplier: 0.5 },
    { attack_type: 'grass', defend_type: 'bug', multiplier: 0.5 },
    { attack_type: 'electric', defend_type: 'water', multiplier: 2 },
    { attack_type: 'electric', defend_type: 'flying', multiplier: 2 },
    { attack_type: 'electric', defend_type: 'ground', multiplier: 0 },
    { attack_type: 'electric', defend_type: 'grass', multiplier: 0.5 },
    { attack_type: 'electric', defend_type: 'dragon', multiplier: 0.5 },
    { attack_type: 'psychic', defend_type: 'fighting', multiplier: 2 },
    { attack_type: 'psychic', defend_type: 'poison', multiplier: 2 },
    { attack_type: 'psychic', defend_type: 'dark', multiplier: 0 },
    { attack_type: 'psychic', defend_type: 'steel', multiplier: 0.5 },
    { attack_type: 'fighting', defend_type: 'normal', multiplier: 2 },
    { attack_type: 'fighting', defend_type: 'ice', multiplier: 2 },
    { attack_type: 'fighting', defend_type: 'rock', multiplier: 2 },
    { attack_type: 'fighting', defend_type: 'dark', multiplier: 2 },
    { attack_type: 'fighting', defend_type: 'steel', multiplier: 2 },
    { attack_type: 'fighting', defend_type: 'ghost', multiplier: 0 },
    { attack_type: 'fighting', defend_type: 'psychic', multiplier: 0.5 },
    { attack_type: 'fighting', defend_type: 'fairy', multiplier: 0.5 },
    { attack_type: 'fighting', defend_type: 'flying', multiplier: 0.5 },
    { attack_type: 'ghost', defend_type: 'psychic', multiplier: 2 },
    { attack_type: 'ghost', defend_type: 'ghost', multiplier: 2 },
    { attack_type: 'ghost', defend_type: 'normal', multiplier: 0 },
    { attack_type: 'ghost', defend_type: 'dark', multiplier: 0.5 },
    { attack_type: 'dragon', defend_type: 'dragon', multiplier: 2 },
    { attack_type: 'dragon', defend_type: 'fairy', multiplier: 0 },
    { attack_type: 'dragon', defend_type: 'steel', multiplier: 0.5 },
    { attack_type: 'ground', defend_type: 'fire', multiplier: 2 },
    { attack_type: 'ground', defend_type: 'electric', multiplier: 2 },
    { attack_type: 'ground', defend_type: 'poison', multiplier: 2 },
    { attack_type: 'ground', defend_type: 'rock', multiplier: 2 },
    { attack_type: 'ground', defend_type: 'steel', multiplier: 2 },
    { attack_type: 'ground', defend_type: 'flying', multiplier: 0 },
    { attack_type: 'ground', defend_type: 'grass', multiplier: 0.5 },
    { attack_type: 'ground', defend_type: 'bug', multiplier: 0.5 },
  ];

  await knex('type_effectiveness').insert(effectiveness);

  // ========== 攻略数据 ==========
  await knex('guides').insert([
    {
      title: '喷火龙竞技场对战指南',
      content: '喷火龙凭借高特攻和不错的速度，在PvP中表现出色。推荐配招：喷射火焰+阳光烈焰+空气斩+龙之波动。携带生命宝珠进一步提升输出，或携带気合のタスキ确保生存。注意避开岩石属性技能。',
      author: '训练家小程',
      category: 'pvp',
      related_pet_id: petIds[5].id,
    },
    {
      title: '超梦培养全攻略',
      content: '超梦的154特攻种族值冠绝群雄。推荐努力值分配：252特攻+252速度+4HP。性格推荐胆小(+速度-攻击)或内敛(+特攻-攻击)。核心配招：精神强念+波导弹+暗影球+冥想。',
      author: '训练家小程',
      category: 'pvp',
      related_pet_id: petIds[10].id,
    },
  ]);

  // ========== 标签数据 ==========
  const tagIds = await knex('tags').insert([
    { name: '御三家', color: '#534AB7' },
    { name: 'Mega进化', color: '#D4537E' },
    { name: '准神', color: '#EF9F27' },
    { name: '传说', color: '#E24B4A' },
    { name: '幻兽', color: '#1D9E75' },
  ]).returning('id');

  const petTags = [];
  for (let i = 0; i <= 8; i++) petTags.push({ pet_id: petIds[i].id, tag_id: tagIds[0].id });
  petTags.push(
    { pet_id: petIds[5].id, tag_id: tagIds[1].id },
    { pet_id: petIds[5].id, tag_id: tagIds[3].id },
    { pet_id: petIds[10].id, tag_id: tagIds[3].id },
    { pet_id: petIds[10].id, tag_id: tagIds[1].id },
    { pet_id: petIds[11].id, tag_id: tagIds[4].id },
  );
  await knex('pet_tags').insert(petTags);
};
