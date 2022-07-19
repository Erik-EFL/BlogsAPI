require('dotenv/config');
const jwt = require('jsonwebtoken');
const db = require('../../database/models');

const check = {
  ifUserExist: async (email) => {
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (user) {
      const error = new Error('User already registered');
      error.name = 'Conflict';
      throw error;
    }
  },

  ifUserNotExist: async (email) => {
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      const error = new Error('User not registered');
      error.name = 'NotFound';
      throw error;
    }
  },

  validateUser: (user, pass) => {
    if (!user || user.password !== pass) {
      const error = new Error('Invalid fields');
      error.name = 'Validation';
      throw error;
    }
  },
  token: {
    ifValid: (token) => {
      try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET);
        return data;
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
        err.status = 401;
        throw err;
      }
    },
  },
};

module.exports = check;
