const { User } = require('../models');
const serviceToken = require('./token.services');

const userService = {
  create: async (data) => {
    const newUser = await User.create(data);
    const { password, image, ...userWithoutPassword } = newUser;
    const token = serviceToken.generate(userWithoutPassword);

    return token;
  },

  getAll: async () => {
    const user = await User.findAll();
    return user;
  },
};

module.exports = { userService };
