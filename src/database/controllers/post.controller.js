const { validate } = require('../../middleware/validations/validate');
const check = require('../../middleware/validations/verification.error');
const postService = require('../services/post.services');

const postController = {
  post: {
    create: async (req, res) => {
      const data = validate.posts.body.object(req.body);
      const token = req.headers.authorization;

      const userId = check.token.get.id(token);

      await validate.posts.body.category(data);
      
      const newPost = await postService.post.create({ data, userId });
      return res.status(201).json(newPost);
    },
  },
};

module.exports = postController;
