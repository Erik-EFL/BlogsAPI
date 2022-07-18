const { Router } = require('express');
const { authenticationController } = require('../controllers/login.controller');

const login = Router();

login.post('/', authenticationController.login);

module.exports = login;
