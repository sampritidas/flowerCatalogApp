const commentsByName = (comments, name) => {
  return comments.filter((comment) => {
    return comment.name === name;
  })
};

const apiHandler = (req, res, next) => {
  if (req.url.includes('/api/comments') && req.method === 'GET') {
    res.end(JSON.stringify(req.comments));
    return;
  }

  if (req.url.includes('/api/search') && req.method === 'GET') {
    req.url = new URL(`http://${req.headers.host}${req.url}`);
    const name = req.url.searchParams.get('name');
    console.log('name', name);
    res.setHeader('content-type', 'application/json');
    const result = commentsByName(req.comments, name);
    res.end(JSON.stringify(result));
    return;
  }

  next();
  return;
};

module.exports = { apiHandler };
