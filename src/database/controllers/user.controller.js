const check = require('../../middleware/validations/verifications.error');
const { validade } = require('../../middleware/validations/validations');
const { userService } = require('../services/user.services');

const userController = {
  create: async (req, res) => {
    const data = validade.register.body(req.body);

    await check.register.userExist(data.email);

    const newUser = await userService.create(data);
    res.status(201).json({ token: newUser });
  },

  getAll: async (_req, res) => {
    const user = await userService.getAll();
    res.status(200).json(user);
  },
};

module.exports = { userController };
