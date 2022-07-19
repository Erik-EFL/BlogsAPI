require('dotenv/config');
const jwt = require('jsonwebtoken');

const generate = (user) => {
  const { password, ...userResponse } = user;
  const token = jwt.sign({ id: userResponse }, process.env.JWT_SECRET);
  return token;
};

module.exports = generate;
