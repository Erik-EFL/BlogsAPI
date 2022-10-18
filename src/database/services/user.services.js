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
    const user = await User.findAll({ attributes: { exclude: ['password'] } });
    return user;
  },

  getOne: async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return user;
  },

  getByEmail: async (email) => {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
    if (!user) return null;
    return user;
  },

  delete: async (id) => {
    const user = await User.destroy({
      where: { id },
    });
    return user;
  },
};

module.exports = { userService };
