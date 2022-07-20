const { Category } = require('../models');

const categoryService = {
  post: {
    create: async (data) => {
      const newCategory = await Category.create(data);
      return newCategory;
    },
  },
  get: {
    all: async () => {
      const categories = await Category.findAll();
      return categories;
    },
  },
};

module.exports = categoryService;
