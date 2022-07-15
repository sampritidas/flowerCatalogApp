const makeJsonToString = (bodyParams) => {
  if (!bodyParams.length) {
    return bodyParams;
  }
  const parseParams = {};
  const params = bodyParams.split('&');
  params.forEach(param => {
    const [key, value] = param.split('=');
    parseParams[key] = value;
  });
  return parseParams;
};

const addComment = (req, res, next) => {
  const { name, comment } = makeJsonToString(req.bodyParam);
  req.guestbook.addComment(name, comment);

  res.end('Comment Added Successfully');
  next();
  return;
};

module.exports = { addComment };
