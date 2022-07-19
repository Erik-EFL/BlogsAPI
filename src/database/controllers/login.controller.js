const { validade } = require('../../middleware/validations/validate');
const check = require('../../middleware/validations/verification.error');
const { authenticationService } = require('../services/login.services');

const authenticationController = {
  login: async (req, res) => {
    const { email, password } = validade.login.body(req.body);
    const token = await authenticationService.login(email, password);
    res.status(200).json({ token });
  },

  tokenValidation: (req, _res, next) => {
    const { authorization } = req.headers;

    check.token.ifExist(authorization);
    check.token.ifValid(authorization);

    next();
  },
};

module.exports = { authenticationController };
