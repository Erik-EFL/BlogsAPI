const generate = require('../../middleware/generator/generate.jwt');
const { User } = require('../models');

const userService = {
  create: async (data) => {
    const newUser = await User.create(data);
    const { password, image, ...userWithoutPassword } = newUser;
    const token = generate(userWithoutPassword);

    return token;
  },

  getAll: async () => {
    const user = await User.findAll();
    return user;
  },
};

module.exports = { userService };
