const { Router } = require('express');
const { userController } = require('../controllers/user.controller');

const user = Router();

user.get('/', userController.getAll);

module.exports = user;
