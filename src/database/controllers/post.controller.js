const { validate } = require('../../middleware/validations/validate');
const check = require('../../middleware/validations/verification.error');
// const db = require('../models');
const postService = require('../services/post.services');
// const { userService } = require('../services/user.services');

const postController = {
  get: {
    all: async (_req, res) => {
      const posts = await postService.get.all();
      return res.status(200).json(posts);
    },
    one: async (req, res) => {
      const { id } = req.params;
      const post = await postService.get.one(id);

      check.posts.blogPost.ifExistPost(post);

      return res.status(200).json(post);
    },
  },
  post: {
    create: async (req, res) => {
      const token = req.headers.authorization;
      const userId = check.token.get.id(token);

      const data = validate.posts.body.object(req.body);
      await validate.posts.body.category(data);

      const newPost = await postService.post.create({ data, userId });
      return res.status(201).json(newPost);
    },
  },
  put: {
    edit: async (req, res) => {
      const token = req.headers.authorization;
      const userId = check.token.get.id(token);

      const post = await postService.get.one(req.params.id);
      const blogPost = post.dataValues;

      check.posts.blogPost.ifUserOwnerPost(blogPost.userId, userId);

      const data = await validate.posts.body.object(req.body);

      await postService.put.edit({ data, userId });

      const editedPost = await postService.get.one(req.params.id);

      return res.status(200).json(editedPost);
    },
  },
  delete: {
    one: async (req, res) => {
      const token = req.headers.authorization;
      const userId = check.token.get.id(token);

      const post = await postService.get.one(req.params.id);
      const blogPost = post.dataValues;

      check.posts.blogPost.ifUserOwnerPost(blogPost.userId, userId);

      await postService.delete.one(req.params.id);

      res.sendStatus(204);
    },
  },
};

module.exports = postController;
