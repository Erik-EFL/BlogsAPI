const { User } = require('../models/user');

const userService = {
  getAll: async () => {
    const user = await User.findAll();
    return user;
  },
};

module.exports = { userService };
