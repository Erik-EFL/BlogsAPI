const { validate } = require('../../middleware/validations/validate');
const check = require('../../middleware/validations/verification.error');
const postService = require('../services/post.services');

const postController = {
  get: {
    all: async (_req, res) => {
      const posts = await postService.get.all();
      return res.status(200).json(posts);
    },
    one: async (req, res) => {
      const { id } = req.params;
      const post = await postService.get.one(id);
      return res.status(200).json(post);
    },
    search: async (req, res) => {
      const { q: searchedTerm } = req.query;
      const posts = await postService.get.search(searchedTerm);

      return res.status(200).json(posts);
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
      const { title, content } = await validate.posts.body.object(req.body);
      const { id } = req.params;
      const token = req.headers.authorization;
      const userId = check.token.get.id(token);

      const post = await postService.get.one(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
      }

      const postUserId = post.dataValues.userId;

      check.posts.blogPost.ifUserOwnerPost(postUserId, userId);

      await postService.put.edit({ title, content, id });
      const editedPost = await postService.get.one(id);

      return res.status(200).json(editedPost);
    },
  },
  delete: {
    one: async (req, res) => {
      const token = req.headers.authorization;
      const userId = check.token.get.id(token);

      const post = await postService.get.one(req.params.id);
      console.log('65, postController', post);
      if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
      }

      check.posts.blogPost.ifExistPost(post);
      check.posts.blogPost.ifUserOwnerPost(post.userId, userId);

      await postService.delete.one(req.params.id);

      res.sendStatus(204);
    },
  },
};

module.exports = postController;
