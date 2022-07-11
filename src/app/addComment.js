const { Guestbook } = require("./guestbook");

const addComment = (req, res) => {
  const name = req.bodyParam.get('name');
  const comment = req.bodyParam.get('comment');

  req.guestbook.initialize();
  req.guestbook.addComment(name, comment);

  res.end();
  return;
};

const addCommentHandler = (req, res, next) => {
  if (req.url.includes('addcomment') && req.method === 'POST') {
    const commentFile = './src/app/comments.json';

    const guestbook = new Guestbook(commentFile);
    req.guestbook = guestbook;
    addComment(req, res);
    return;
  }
  next();
};

module.exports = { addCommentHandler };
