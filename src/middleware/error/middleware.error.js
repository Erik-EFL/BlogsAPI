const erros = {
  Conflict: 409,
  NotFound: 404,
  Unauthorized: 401,
  Validation: 400,
  default: 500,
};

const middlewareError = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = erros[name] || erros.default;
  console.warn(err); res.status(status).json({ message });
};

module.exports = middlewareError;
