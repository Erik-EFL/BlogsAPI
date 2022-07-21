const Sequelize = require('sequelize');
const db = require('../models');
const { PostCategory } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const postService = {
  post: {
    create: async ({ data, userId }) => {
      const { title, content, categoryIds } = data;
      const newPost = await sequelize.transaction(async (t) => {
        const post = await db.BlogPost.create({ title, content, userId }, { t });
        await Promise.all(categoryIds.map(
          (id) => PostCategory.create({ postId: post.id, categoryId: id }, { t }),
          ));
        return post;
      });
      return newPost;
    },
  },
};

module.exports = postService;
