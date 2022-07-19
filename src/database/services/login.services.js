const check = require('../../middleware/validations/verifications.error');
const db = require('../models');
const serviceToken = require('./token.services');

const authenticationService = {
  login: async (email, pass) => {
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    check.ifUserNotExist(email);
    check.validateUser(user, pass);

    const { password, ...userWithoutPassword } = user;

    const token = serviceToken.generate(userWithoutPassword);

    return token;
  },

  tokenValidation: (token) => {
    const user = serviceToken.verify(token);
    return user;
  },
};

module.exports = { authenticationService };
