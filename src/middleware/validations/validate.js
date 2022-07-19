const Joi = require('joi');

const validade = {
  login: {
    body: (data) => {
      const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.message = 'Some required fields are missing';
      error.name = 'Validation';
      throw error;
    }
    return value;
    },
  },
  register: {
    body: (data) => {
      const schema = Joi.object({
        displayName: Joi.string().min(8).required().messages({
          'string.min': '"displayName" length must be at least 8 characters long',
        }),
        email: Joi.string().email().required().messages({
          'any.empty': '"email" must be a valid email',
        }),
        password: Joi.string().min(6).required().messages({
          'any.empty': '"password" length must be at least 6 characters long',
        }),
        image: Joi.string().empty(''),
      });

      const { error, value } = schema.validate(data);
      if (error) {
        error.name = 'Validation';
        throw error;
      }

      return value;
    },
  },

};

module.exports = { validade };
