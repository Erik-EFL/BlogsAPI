const db = require('../models');
const serviceToken = require('./token.services');

const authenticationService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || user.passwordHash !== password) {
      const error = new Error('Invalid fields');
      error.name = 'UnauthorizedError';
      error.status = 400;
      throw error;
    }

    const { passwordHash, ...userWithoutPassword } = user.dataValue;

    const token = serviceToken.generate(userWithoutPassword);

    return token;
  },

  tokenValidation: (token) => {
    const user = serviceToken.verify(token);
    return user;
  },
};

module.exports = { authenticationService };
