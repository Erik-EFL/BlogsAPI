const Sequelize = require('sequelize');
const db = require('../models');
const { PostCategory } = require('../models');
const config = require('../config/config');
const check = require('../../middleware/validations/verification.error');

const sequelize = new Sequelize(config.development);

const postService = {
  get: {
    all: async () => {
      const posts = await db.BlogPost.findAll({
        include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: db.Category,
            through: { attributes: [] },
            as: 'Category',
            attributes: { exclude: ['createdAt', 'updatedAt'] } }],
      });
      return posts;
    },
    one: async (id) => {
      const post = await db.BlogPost.findOne({
        where: { id },
        include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: db.Category,
            through: { attributes: [] },
            as: 'Category',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          }],
      });
      console.log('SOU UM MERDA 30', post);
      return post;
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
    edit: async ({ data, userId }) => {
      const { title, content } = data;
      const editedPost = await db.BlogPost.update(
          { title, content }, { where: { userId } },
          );
      return editedPost;
    },
  },
  delete: {
    one: async (postId) => {
      await db.BlogPost.destroy({ where: { id: postId } });
    },
  },
};

module.exports = postService;
