const { Category } = require('../models');

const categoryService = {
  post: {
    create: async (data) => {
      const newCategory = await Category.create(data);
      return newCategory;
    },
  },
};

module.exports = categoryService;
