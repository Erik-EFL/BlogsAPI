const category = require('./categories.routes');
const user = require('./users.routes');
const login = require('./login.routes');
const posts = require('./posts.routes');

const routes = {
  category,
  login,
  posts,
  user,
};

module.exports = { routes };
