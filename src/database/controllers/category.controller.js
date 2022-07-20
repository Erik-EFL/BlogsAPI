const { validade } = require('../../middleware/validations/validate');
const categoryService = require('../services/category.services');

const categoryController = {
  post: {
    create: async (req, res) => {
      const { name } = validade.category.body.name(req.body);
      const newCategory = await categoryService.post.create({ name });
      res.status(201).json(newCategory);
    },
  },
};

module.exports = categoryController;
