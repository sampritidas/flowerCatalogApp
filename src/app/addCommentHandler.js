const addComment = (req, res, next) => {
  const { name, comment } = req.bodyParam;
  req.guestbook.addComment(name, comment);

  res.end('Comment Added Successfully');
  next();
  return;
};

module.exports = { addComment };
