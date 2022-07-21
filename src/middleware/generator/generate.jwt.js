const jwt = require('jsonwebtoken');
require('dotenv/config');

const generate = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  return token;
};

module.exports = generate;
