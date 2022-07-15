const commentsByName = (comments, name) => {
  return comments.filter((comment) => {
    return comment.name === name;
  })
};

const fetchComments = (req, res, next) => {
  res.end(JSON.stringify(req.comments));
};

const searchByName = (req, res, next) => {
  req.url = new URL(`http://${req.headers.host}${req.url}`);
  const name = req.url.searchParams.get('name');

  res.set('content-type', 'application/json');
  const result = commentsByName(req.comments, name);
  res.end(JSON.stringify(result));
  return;
};

module.exports = { fetchComments, searchByName, commentsByName };
