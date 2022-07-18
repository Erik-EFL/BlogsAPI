const errorCheck = {
  register: {
    conflict: (user) => {
      if (user) {
        const error = new Error('User already registered');
        error.name = 'ConflictError';
        error.statusCode = 409;
        throw error;
      }
    },
  },
};

module.exports = errorCheck;
