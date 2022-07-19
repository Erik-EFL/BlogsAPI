const check = require('../../middleware/validations/verifications.error');
const { validade } = require('../../middleware/validations/validations');
const { userService } = require('../services/user.services');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = validade.register.body(req.body);

    await check.ifUserExist(email);
    const newUser = await userService.create({ displayName, email, password, image });

    res.status(201).json({ token: newUser });
  },

  getAll: async (_req, res) => {
    const user = await userService.getAll();
    res.status(200).json(user);
  },
};

module.exports = { userController };
