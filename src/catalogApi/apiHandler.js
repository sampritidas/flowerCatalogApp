const apiHandler = (req, res, next) => {
  if (req.url.includes('api/comments')) {
    res.end(JSON.stringify(req.comments));
    return;
  }
  next();
  return;
};

module.exports = { apiHandler };
