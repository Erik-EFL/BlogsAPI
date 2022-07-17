const middlewareError = (err, _req, res, _next) => {
  const { name, statusCode, message } = err;
  switch (name) {
    case 'UnauthorizedError':
      res.status(statusCode).json({ message }); break;
    case 'ConflictError':
      res.status(statusCode).json({ message }); break;
    case 'NotFoundError':
      res.status(statusCode).json({ message }); break;
    case 'ValidationError':
      res.status(statusCode).json({ message }); break;
    default:
      console.warn(err); res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = middlewareError;
