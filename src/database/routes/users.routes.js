const { Router } = require('express');
const { userController } = require('../controllers/user.controller');
const {
  authenticationController: { tokenValidation } } = require('../controllers/login.controller');

const user = Router();

user.post('/', userController.create);
user.get('/', tokenValidation, userController.getAll);

module.exports = user;
