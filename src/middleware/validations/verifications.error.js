const db = require('../../database/models');

const check = {
  ifUserExist: async (email) => {
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (user) {
      const error = new Error('User already registered');
      error.name = 'ConflictError';
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
      error.name = 'NotFoundError';
      throw error;
    }
  },
  
  validateUser: (user, pass) => {
    if (!user || user.password !== pass) {
      const error = new Error('Invalid fields');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },
};

module.exports = check;
