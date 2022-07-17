require('dotenv').config();
const app = require('./api');
const { routes } = require('./database/routes/export.routes');
const middlewareError = require('./middleware/error/middleware.error');
// const middlewareAuth = require('./middleware/auth/middleware.auth');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', routes.user);

app.use(middlewareError);

app.listen(port, () => console.log('ouvindo porta', port));
