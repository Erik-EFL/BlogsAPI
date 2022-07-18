const Joi = require('joi');

const validade = {
  login: {
    body: (data) => {
      const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'any.empty': 'Some required fields are missing',
      }),
      password: Joi.string().min(6).required().messages({
        'any.empty': 'Some required fields are missing',
      }),
    });
    
    const { error, value } = schema.validate(data);
    if (error) throw error;
    return value;
    },
  },
};

module.exports = { validade };
