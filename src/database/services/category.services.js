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
      console.log(id);
      const category = await db.Category.findOne({
        where: { id },
      });

      check.posts.category.ifExist(category);
    },
  },
};

module.exports = categoryService;
