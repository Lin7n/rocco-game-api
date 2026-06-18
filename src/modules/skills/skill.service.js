/**
 * 技能服务 (纯内存版)
 */
const { getById, filterByType, filterByCategory, search, getForPet, SKILLS } = require('../../data/skills');

class SkillService {
  list({ page = 1, pageSize = 20, keyword, type, category } = {}) {
    let result = [...SKILLS];
    if (keyword) {
      const q = keyword.toLowerCase().trim();
      result = result.filter(s =>
        s.name.includes(q) || s.desc.includes(q) || s.effect.includes(q)
      );
    }
    if (type) result = result.filter(s => s.type === type);
    if (category) result = result.filter(s => s.category === category);

    const total = result.length;
    const start = (Number(page) - 1) * Number(pageSize);
    const items = result.slice(start, start + Number(pageSize));
    return { items, total, page: Number(page), pageSize: Number(pageSize) };
  }

  getById(id) {
    const skill = getById(id);
    if (!skill) {
      const err = new Error('技能不存在');
      err.statusCode = 404;
      throw err;
    }
    return skill;
  }

  getCategories() {
    return [...new Set(SKILLS.map(s => s.category))];
  }

  getTypes() {
    return [...new Set(SKILLS.map(s => s.type))].sort();
  }

  getLearnablePets(skillId) {
    const skill = getById(skillId);
    if (!skill) return [];
    const { getById: getPet } = require('../../data/pets');
    return skill.learnablePets.map(id => getPet(id)).filter(Boolean);
  }
}

module.exports = new SkillService();
