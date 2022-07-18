const category = require('./categories.routes');
const user = require('./users.routes');
const login = require('./login.routes');

const routes = {
  category,
  login,
  user,
};

module.exports = { routes };
