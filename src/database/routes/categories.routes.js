const { Router } = require('express');
const { userController } = require('../database/controllers/user.controllers');

const category = Router();

category.get('/', userController.getAll);

module.exports = category;
