const { Router } = require('express');
const categoryController = require('../controllers/category.controller');
const {
  authenticationController: { tokenValidation } } = require('../controllers/login.controller');

const category = Router();

// category.get('/', categoryController.);
category.post('/', tokenValidation, categoryController.post.create);

module.exports = category;
