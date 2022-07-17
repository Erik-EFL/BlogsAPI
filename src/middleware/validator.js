const schemas = {
  login: (schema) => (login) => {
    const { error, value } = schema.validate(login);
    if (error) {
      error.message = error.details[0].message;
      switch (error.details[0].type) {
        case 'any.empty':
          error.code = 400;
          break;
        default:
          error.code = 500;
          break;
      }
      throw error;
    }
    return value;
  },

  register: (schema) => (data) => {
    const { error, value } = schema.validate(data);
    if (error) {
      error.message = error.details[0].message;
      switch (error.details[0].type) {
        case 'string.min':
        case 'any.empty':
          error.code = 400;
          break;
        default:
          error.code = 500;
          break;
      }
      throw error;
    }
    return value;
  },
};

module.exports = { schemas };
