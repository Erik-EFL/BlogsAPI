const check = require('../../middleware/validations/verification.error');
const db = require('../models');

const categoryService = {
  post: {
    create: async (data) => {
      const newCategory = await db.Category.create(data);
      return newCategory;
    },
  },
  get: {
    all: async () => {
      const categories = await db.Category.findAll();
      return categories;
    },

    one: async (id) => {
      const category = await db.Category.findByPk(id);
      check.posts.category.ifExist(category);
      return category;
    },
  },
};

module.exports = categoryService;
