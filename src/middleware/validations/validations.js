const Joi = require('joi');
const { runSchema } = require('../validator');

const validade = {
  login: {
    body: runSchema(Joi.object({
      email: Joi.string().email().required().messages({
        'empty.field': 'Some required fields are missing',
      }),
      password: Joi.string().min(6).required().messages({
        'string.min': '"password" length must be 5 characters long',
        'empty.field': 'Some required fields are missing',
      }),
    })),
  },
};

module.exports = { validade };
