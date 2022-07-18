require('dotenv/config');
const jwt = require('jsonwebtoken');

const serviceToken = {
  /* Cria um token para um usuario que expira em uma hora */
  generate: (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return token;
  },

  /* Verifica se o token é valido */
  verify: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
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
