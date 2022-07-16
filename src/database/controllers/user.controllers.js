const { userService } = require('../services/user.services');

const userController = {
  getAll: async (_req, res) => {
    const user = await userService.getAll();
    res.status(200).json(user);
  },
};

module.exports = { userController };
