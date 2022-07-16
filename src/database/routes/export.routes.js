const category = require('./categories.routes');
const user = require('./users.routes');

const routes = {
  category,
  user,
};

module.exports = { routes };
