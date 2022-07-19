const { User } = require('../models/user');
const serviceToken = require('./token.services');

const userService = {

  create: async ({ displayName, email, password, image }) => {
    const newUser = await User.create({ displayName, email, password, image });
    const { password: pass, ...userWithoutPassword } = newUser.dataValue;

    const token = serviceToken.generate(userWithoutPassword);

    return token;
  },

  getAll: async () => {
    const user = await User.findAll();
    return user;
  },
};

module.exports = { userService };
