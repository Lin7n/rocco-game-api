const { z } = require('zod');
const { getDb } = require('../../database/db');
const { NotFoundError } = require('../../shared/errors');
const logger = require('../../shared/logger');

class PetService {
  async list({ page = 1, pageSize = 20, keyword, type, rarity, sortBy = 'national_id', generation, tag }) {
    const db = getDb();
    let query = db('pets')
      .select('id', 'national_id', 'name', 'name_en', 'thumbnail_url', 'rarity',
        'primary_type', 'secondary_type', 'base_total', 'meta_score', 'generation')
      .where('is_active', true);

    if (keyword) {
      query = query.where(function () {
        this.where('name', 'like', `%${keyword}%`)
          .orWhere('name_en', 'like', `%${keyword}%`);
      });
    }
    if (type) {
      query = query.where(function () {
        this.where('primary_type', type).orWhere('secondary_type', type);
      });
    }
    if (rarity) {
      const rarities = rarity.split(',').map(r => r.trim()).filter(Boolean);
      if (rarities.length) query = query.whereIn('rarity', rarities);
    }
    if (generation) query = query.where('generation', generation);
    if (tag) {
      query = query.whereIn('id', function () {
        this.select('pet_id').from('pet_tags')
          .whereIn('tag_id', function () {
            this.select('id').from('tags').where('name', tag);
          });
      });
    }

    const countQuery = query.clone().clearSelect().count('* as total').first();

    const safeSortColumns = ['national_id', 'name', 'base_total', 'meta_score', 'rarity'];
    const sort = safeSortColumns.includes(sortBy) ? sortBy : 'national_id';
    query = query.orderBy(sort).limit(pageSize).offset((page - 1) * pageSize);

    const [items, countResult] = await Promise.all([query, countQuery]);
    return { items, total: countResult.total, page, pageSize };
  }

  async getById(id) {
    const db = getDb();
    const pet = await db('pets').where({ id, is_active: true }).first();
    if (!pet) throw new NotFoundError('精灵', id);

    const [skills, evolutionChain, tags] = await Promise.all([
      db('pet_skills')
        .join('skills', 'pet_skills.skill_id', 'skills.id')
        .where('pet_skills.pet_id', id)
        .select('skills.id', 'skills.name', 'skills.type', 'skills.category',
          'skills.power', 'skills.accuracy', 'skills.pp', 'skills.description',
          'pet_skills.learn_method', 'pet_skills.level_learned')
        .orderBy('pet_skills.level_learned'),
      pet.evolution_chain_id
        ? db('pets').where('evolution_chain_id', pet.evolution_chain_id)
          .where('is_active', true)
          .select('id', 'national_id', 'name', 'name_en', 'thumbnail_url',
            'rarity', 'primary_type', 'secondary_type', 'evolution_stage',
            'evolves_from_id', 'evolves_to_id', 'evolution_method')
          .orderBy('evolution_stage')
        : [],
      db('pet_tags').join('tags', 'pet_tags.tag_id', 'tags.id')
        .where('pet_tags.pet_id', id)
        .select('tags.name', 'tags.color'),
    ]);

    return { ...pet, skills, evolution_chain: evolutionChain, tags };
  }

  async getEvolutionChain(chainId) {
    const db = getDb();
    const chain = await db('pets')
      .where({ evolution_chain_id: chainId, is_active: true })
      .select('id', 'national_id', 'name', 'name_en', 'thumbnail_url',
        'rarity', 'evolution_stage', 'evolves_from_id', 'evolves_to_id',
        'evolution_method')
      .orderBy('evolution_stage');
    if (!chain.length) throw new NotFoundError('进化链', chainId);
    return chain;
  }

  async getTypes() {
    const db = getDb();
    const rows = await db('pets').where('is_active', true)
      .select('primary_type').distinct();
    return rows.map(r => r.primary_type).sort();
  }

  async getRarities() {
    const db = getDb();
    const rows = await db('pets').where('is_active', true)
      .select('rarity').distinct();
    return rows.map(r => r.rarity);
  }

  async getTypeEffectiveness() {
    const db = getDb();
    return db('type_effectiveness').select('*').orderBy('attack_type');
  }
}

module.exports = new PetService();
