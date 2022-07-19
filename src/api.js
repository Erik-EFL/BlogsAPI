const express = require('express');
require('express-async-errors');
const { routes } = require('./database/routes/export.routes');
const middlewareError = require('./middleware/error/middleware.error');

// ...
const app = express();

app.use(express.json());

// ...
app.use('/login', routes.login);

app.use('/user', routes.user);

app.use(middlewareError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
