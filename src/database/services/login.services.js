const generate = require('../../middleware/generator/generate.jwt');
const check = require('../../middleware/validations/verification.error');
const db = require('../models');

const authenticationService = {
  login: async (email, pass) => {
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    check.validateUser(user, pass);

    const { password, ...userWithoutPassword } = user;

    const token = generate(userWithoutPassword);

    return token;
  },

  tokenValidation: (token) => {
    const user = check.token.verify(token);
    return user;
  },
};

module.exports = { authenticationService };
