const { validade } = require('../../middleware/validations/validations');
const { authenticationService } = require('../services/login.services');

const authenticationController = {
  login: async (req, res) => {
    const { email, password } = validade.login.body(req.body);
    const token = await authenticationService.login(email, password);
    res.status(200).json({ token });
  },

  tokenValidation: (req, res, next) => {
    const { authorization } = req.headers;

    authenticationService.tokenValidation(authorization);

    next();
  },
};

module.exports = { authenticationController };
