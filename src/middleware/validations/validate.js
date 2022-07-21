const Joi = require('joi');
const categoryService = require('../../database/services/category.services');

const validate = {
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
  category: {
    body: {
      name: (name) => {
        const schema = Joi.object({
          name: Joi.string().required(),
        });

        const { error, value } = schema.validate(name);
        if (error) {
          error.message = '"name" is required';
          error.name = 'Validation';
          throw error;
        }
        return value;
      },
    },
  },
  posts: {
    body: {
      object: (object) => {
        const schema = Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
          categoryIds: Joi.array().min(1).messages({
            'array.includes': '"categoryIds" not found',
          }),
        });

        const { error, value } = schema.validate(object);
        if (error) {
          error.message = 'Some required fields are missing';
          error.name = 'Validation';
          throw error;
        }
        return value;
      },
      category: async ({ categoryIds }) => {
        console.log('EU TO LOOOOKO', categoryIds);
        await Promise.all(categoryIds.map(
          (categoryId) => categoryService.get.one(categoryId),
          ));
      },
    },
  },
};

module.exports = { validate };
