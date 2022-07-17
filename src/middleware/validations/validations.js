const Joi = require('joi');
const { schemas } = require('../validator');

const validade = {
  login: {
    body: schemas.login(Joi.object({
      email: Joi.string().email().required().messages({
        'any.empty': 'Some required fields are missing',
      }),
      password: Joi.string().min(6).required().messages({
        'any.empty': 'Some required fields are missing',
      }),
    })),
  },
};

module.exports = { validade };
