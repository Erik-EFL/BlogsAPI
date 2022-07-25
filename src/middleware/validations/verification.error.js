const jwt = require('jsonwebtoken');
const db = require('../../database/models');
require('dotenv/config');

const check = {
  user: {
    ifExist: async (email) => {
      const user = await db.User.findOne({
        where: { email },
      });

      if (user) {
        const error = new Error('User already registered');
        error.name = 'Conflict';
        throw error;
      }
    },
    ifNotExist: async (email) => {
      const user = await db.User.findOne({
        where: { email },
      });

      if (!user) {
        const error = new Error('User not registered');
        error.name = 'NotFound';
        throw error;
      }
    },
    validate: (user, pass) => {
      if (!user || user.password !== pass) {
        const error = new Error('Invalid fields');
        error.name = 'Validation';
        throw error;
      }
    },
  },
  token: {
    ifValid: (token) => {
      try {
        const { user: { id } } = jwt.verify(token, process.env.JWT_SECRET);
        return id;
      } catch (error) {
        const err = new Error('Expired or invalid token');
        err.name = 'Unauthorized';
        throw err;
      }
    },
    ifExist: (token) => {
      if (!token) {
        const err = new Error('Token not found');
        err.name = 'Unauthorized';
        throw err;
      }
    },
    get: {
      id: (token) => {
        const { user: { id } } = jwt.verify(token, process.env.JWT_SECRET);
        return id;
      },
    },
  },
  posts: {
    category: {
      ifExist: (categoryId) => {
        if (!categoryId) {
          const error = new Error('"categoryIds" not found');
          error.name = 'Validation';
          throw error;
        }
      },
    },
    blogPost: {
      ifExistPost: (blogPostId) => {
        if (!blogPostId) {
          const error = new Error('Post does not exist');
          error.name = 'NotFound';
          throw error;
        }
      },

      ifUserOwnerPost: (blogPostUserId, userId) => {
        if (blogPostUserId !== userId) {
          const error = new Error('Unauthorized user');
          error.name = 'Unauthorized';
          throw error;
        }
      },

      ifUserExist: async (userId) => {
        const user = await db.User.findByPk(userId, {
          where: { id: userId },
        });

        if (!user) {
          const error = new Error('User does not exist');
          error.name = 'NotFound';
          throw error;
        }
        return user;
      },
    },
  },
};

module.exports = check;
