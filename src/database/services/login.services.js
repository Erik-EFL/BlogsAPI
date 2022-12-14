const generate = require('../../middleware/generator/generate.jwt');
const check = require('../../middleware/validations/verification.error');
const db = require('../models');

const authenticationService = {
  login: async (email, pass) => {
    const user = await db.User.findOne({
      where: { email },
    });

    check.user.validate(user, pass);

    const { password, ...userWithoutPassword } = user.dataValues;
    const token = generate(userWithoutPassword);

    return token;
  },
};

module.exports = { authenticationService };
