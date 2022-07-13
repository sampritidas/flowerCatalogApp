const logRequest = logger => (req, res, next) => {
  logger(new Date(), req.method, req.url);
  next();
};

module.exports = { logRequest };
