const errorCheck = {
  login: {
    body: (user, password) => {
      if (!user || user.password !== password) {
        const message = new Error('Invalid fields');
        message.name = 'UnauthorizedError';
        message.status = 400;
        throw message;
      }
    },
  },

  register: {
    conflict: (user) => {
      if (user) {
        const message = new Error('User already registered');
        message.name = 'ConflictError';
        message.status = 409;
        throw message;
      }
    },
  },
};

module.exports = errorCheck;
