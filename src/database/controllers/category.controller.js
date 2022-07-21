const { validate } = require('../../middleware/validations/validate');
const categoryService = require('../services/category.services');

const categoryController = {
  post: {
    create: async (req, res) => {
      const { name } = validate.category.body.name(req.body);
      const newCategory = await categoryService.post.create({ name });
      res.status(201).json(newCategory);
    },
  },
  get: {
    all: async (_req, res) => {
      const categories = await categoryService.get.all();
      res.status(200).json(categories);
    },
  },
};

module.exports = categoryController;
