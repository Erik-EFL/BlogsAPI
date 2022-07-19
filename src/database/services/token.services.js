require('dotenv/config');
const jwt = require('jsonwebtoken');

const serviceToken = {
  generate: (user) => {
    const { password, ...userResponse } = user;
    const token = jwt.sign({ id: userResponse }, process.env.JWT_SECRET);
    return token;
  },

  verify: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (error) {
      const err = new Error('Expired or invalid token');
      err.name = 'UnauthorizedError';
      err.status = 401;
      throw err;
    }
  },
};

module.exports = serviceToken;
