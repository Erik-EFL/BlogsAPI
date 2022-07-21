const check = require('../../middleware/validations/verification.error');
const { validate } = require('../../middleware/validations/validate');
const { userService } = require('../services/user.services');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = validate.register.body(req.body);

    await check.user.ifExist(email);

    const newUser = await userService.create({ displayName, email, password, image });

    res.status(201).json({ token: newUser });
  },

  getAll: async (_req, res) => {
    const user = await userService.getAll();
    res.status(200).json(user);
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getOne(id);

    if (!user) {
      const err = new Error('User does not exist');
      err.name = 'NotFound';
      throw err;
    }

    res.status(200).json(user);
  },
};

module.exports = { userController };
