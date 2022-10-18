const Sequelize = require('sequelize');
const db = require('../models');
const { PostCategory } = require('../models');
const config = require('../config/config');
const check = require('../../middleware/validations/verification.error');
const { validate } = require('../../middleware/validations/validate');

const sequelize = new Sequelize(config.development);
const selectedItem = [
  {
    model: db.User,
    as: 'user',
    attributes: { exclude: 'password' },
  },
  {
    model: db.Category,
    as: 'categories',
    through: { attributes: [] },
  },
];

const postService = {
  get: {
    all: async () => {
      const posts = await db.BlogPost.findAll({
        include: selectedItem });
      return posts;
    },

    one: async (id) => {
      const post = await db.BlogPost.findOne({
        where: { id },
        include: selectedItem });
      check.posts.blogPost.ifExistPost(post);
      return post;
    },

    search: async (searchedTerm) => {
      const query = searchedTerm.toLowerCase();
      const posts = await db.BlogPost.findAll({
        where: {
          [Sequelize.Op.or]: [
            { title: { [Sequelize.Op.substring]: query } },
            { content: { [Sequelize.Op.substring]: query } },
          ],
        },
        include: selectedItem });
      return posts;
    },
  },

  post: {
    create: async ({ data, userId }) => {
      const { title, content, categoryIds } = data;

      const newPost = await sequelize.transaction(async (transaction) => {
        const post = await db.BlogPost.create({ title, content, userId }, { transaction });
        await Promise.all(categoryIds.map(
          (id) => PostCategory.create({ postId: post.id, categoryId: id }, { transaction }),
          ));
        return post;
      });
      return newPost;
    },
  },

  put: {
    edit: async ({ title, content, id }) => {
      const post = await db.BlogPost.update({ title, content }, { where: { id } });
      return post;
    },
  },

  delete: {
    one: async (postId) => {
      await db.BlogPost.destroy({ where: { id: postId } });
    },
  },
};

module.exports = postService;
