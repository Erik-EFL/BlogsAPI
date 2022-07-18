const middlewareError = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'UnauthorizedError':
      res.status(401).json({ message }); break;
    case 'ConflictError':
      res.status(409).json({ message }); break;
    case 'ValidationError':
      res.status(400).json({ message }); break;
    default:
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = middlewareError;
