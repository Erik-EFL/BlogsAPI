const erros = {
  ConflictError: 409,
  NotFoundError: 404,
  UnauthorizedError: 401,
  ValidationError: 400,
  default: 500,
};

const middlewareError = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = erros[name] || erros.default;
  res.status(status).json({ message });
};

module.exports = middlewareError;
