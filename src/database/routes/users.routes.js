const { Router } = require('express');
const { userController } = require('../controllers/user.controller');
const {
  authenticationController: { tokenValidation } } = require('../controllers/login.controller');

const user = Router();

user.post('/', userController.create);
user.get('/', tokenValidation, userController.getAll);
user.get('/:id', tokenValidation, userController.getOne);
user.delete('/me', tokenValidation, userController.delete);

module.exports = user;
