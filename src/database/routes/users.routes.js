const { Router } = require('express');
const { userController } = require('../database/controllers/user.controllers');

const user = Router();

user.get('/', userController.getAll);

module.exports = user;
