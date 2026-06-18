exports.up = function (knex) {
  return knex.schema

    .createTable('pets', (t) => {
      t.increments('id').primary();
      t.integer('national_id').unique().notNullable().comment('全国图鉴编号');
      t.string('name', 50).notNullable().comment('精灵名称');
      t.string('name_en', 50).notNullable().comment('英文名');
      t.string('image_url', 500).comment('立绘图URL');
      t.string('thumbnail_url', 500).comment('缩略图URL');
      t.string('rarity', 20).notNullable().defaultTo('common')
        .comment('稀有度: common|uncommon|rare|legendary|mythical');
      t.string('primary_type', 20).notNullable().comment('主属性');
      t.string('secondary_type', 20).comment('副属性');
      t.text('description').comment('图鉴描述');
      t.text('habitat').comment('栖息地');
      t.string('category', 30).comment('分类');
      t.string('generation', 30).comment('世代');
      t.decimal('height', 5, 2).comment('身高(m)');
      t.decimal('weight', 6, 1).comment('体重(kg)');
      t.string('abilites', 200).comment('特性(逗号分隔)');
      t.integer('base_hp').notNullable().defaultTo(0).comment('基础HP');
      t.integer('base_attack').notNullable().defaultTo(0).comment('基础攻击');
      t.integer('base_defense').notNullable().defaultTo(0).comment('基础防御');
      t.integer('base_sp_attack').notNullable().defaultTo(0).comment('基础特攻');
      t.integer('base_sp_defense').notNullable().defaultTo(0).comment('基础特防');
      t.integer('base_speed').notNullable().defaultTo(0).comment('基础速度');
      t.integer('base_total').notNullable().defaultTo(0).comment('种族值总和');
      t.float('meta_score', 4, 2).defaultTo(0).comment('综合评分(0-100)');
      t.boolean('is_evolution').defaultTo(false).comment('是否进化形态');
      t.integer('evolution_chain_id').comment('进化链ID');
      t.integer('evolution_stage').defaultTo(0).comment('进化阶段(1/2/3)');
      t.string('evolution_method', 100).comment('进化方式');
      t.integer('evolves_from_id').comment('由哪个精灵进化');
      t.integer('evolves_to_id').comment('进化为哪个精灵');
      t.boolean('is_active').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('updated_at').defaultTo(knex.fn.now());

      t.index('name');
      t.index('rarity');
      t.index('primary_type');
      t.index('evolution_chain_id');
      t.index('base_total');
    })

    .createTable('skills', (t) => {
      t.increments('id').primary();
      t.string('name', 50).notNullable().comment('技能名称');
      t.string('name_en', 50).notNullable().comment('英文名');
      t.string('type', 20).notNullable().comment('技能属性');
      t.string('category', 15).notNullable().comment('类型: physical|special|status');
      t.integer('power').comment('威力');
      t.integer('accuracy').comment('命中率');
      t.integer('pp').notNullable().defaultTo(10).comment('PP值');
      t.integer('max_pp').notNullable().defaultTo(16).comment('最大PP值');
      t.string('target', 20).defaultTo('single').comment('目标: single|self|ally|all_foes|all');
      t.integer('priority').defaultTo(0).comment('优先度');
      t.text('description').notNullable().comment('技能描述');
      t.text('effect').comment('附加效果');
      t.integer('effect_chance').comment('效果触发概率(%)');
      t.string('contact_type', 20).comment('接触类型: contact|ranged');
      t.boolean('is_active').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('updated_at').defaultTo(knex.fn.now());

      t.index('name');
      t.index('type');
      t.index('category');
    })

    .createTable('pet_skills', (t) => {
      t.increments('id').primary();
      t.integer('pet_id').unsigned().notNullable().references('id').inTable('pets').onDelete('CASCADE');
      t.integer('skill_id').unsigned().notNullable().references('id').inTable('skills').onDelete('CASCADE');
      t.string('learn_method', 20).defaultTo('level_up')
        .comment('学习方式: level_up|tm|egg|tutor');
      t.integer('level_learned').comment('等级习得时的等级');
      t.unique(['pet_id', 'skill_id']);

      t.index('pet_id');
      t.index('skill_id');
    })

    .createTable('teams', (t) => {
      t.increments('id').primary();
      t.string('name', 100).notNullable().comment('阵容名称');
      t.string('description', 500).comment('阵容描述');
      t.string('created_by', 100).comment('创建者');
      t.float('score', 5, 2).defaultTo(0).comment('综合评分');
      t.string('grade', 2).comment('等级: S/A/B/C/D');
      t.json('score_breakdown').comment('评分明细JSON');
      t.json('advice').comment('优化建议JSON');
      t.integer('view_count').defaultTo(0);
      t.integer('like_count').defaultTo(0);
      t.boolean('is_public').defaultTo(true);
      t.boolean('is_active').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('updated_at').defaultTo(knex.fn.now());

      t.index('score');
      t.index('grade');
      t.index('is_public');
    })

    .createTable('team_members', (t) => {
      t.increments('id').primary();
      t.integer('team_id').unsigned().notNullable().references('id').inTable('teams').onDelete('CASCADE');
      t.integer('pet_id').unsigned().notNullable().references('id').inTable('pets').onDelete('CASCADE');
      t.integer('position').notNullable().comment('阵容位置(1-6)');
      t.string('item', 50).comment('携带道具');
      t.string('abilite', 50).comment('使用特性');
      t.text('moveset').comment('配招(JSON数组)');
      t.unique(['team_id', 'position']);
      t.unique(['team_id', 'pet_id']);

      t.index('pet_id');
    })

    .createTable('guides', (t) => {
      t.increments('id').primary();
      t.string('title', 200).notNullable().comment('攻略标题');
      t.text('content').notNullable().comment('攻略内容');
      t.string('author', 100).comment('作者');
      t.string('category', 30).comment('分类: pvp|pve|breeding|collecting');
      t.integer('related_pet_id').unsigned().references('id').inTable('pets').onDelete('SET NULL');
      t.integer('view_count').defaultTo(0);
      t.integer('like_count').defaultTo(0);
      t.boolean('is_published').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('updated_at').defaultTo(knex.fn.now());

      t.index('category');
      t.index('related_pet_id');
    })

    .createTable('type_effectiveness', (t) => {
      t.increments('id').primary();
      t.string('attack_type', 20).notNullable();
      t.string('defend_type', 20).notNullable();
      t.float('multiplier', 3, 1).notNullable().comment('倍率: 0|0.5|1|2');
      t.unique(['attack_type', 'defend_type']);
    })

    .createTable('tags', (t) => {
      t.increments('id').primary();
      t.string('name', 30).notNullable().unique();
      t.string('color', 10).defaultTo('#666');
    })

    .createTable('pet_tags', (t) => {
      t.integer('pet_id').unsigned().notNullable().references('id').inTable('pets').onDelete('CASCADE');
      t.integer('tag_id').unsigned().notNullable().references('id').inTable('tags').onDelete('CASCADE');
      t.primary(['pet_id', 'tag_id']);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('pet_tags')
    .dropTableIfExists('tags')
    .dropTableIfExists('type_effectiveness')
    .dropTableIfExists('guides')
    .dropTableIfExists('team_members')
    .dropTableIfExists('teams')
    .dropTableIfExists('pet_skills')
    .dropTableIfExists('skills')
    .dropTableIfExists('pets');
};
