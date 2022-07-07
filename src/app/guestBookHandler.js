const { Guestbook } = require('./guestbook.js');

const guestBook = (req, res) => {
  const content = req.guestbook.getContent();
  res.statuscode = 301;
  res.setHeader('content-type', 'text/html');
  res.end(content);
};

const guestBookHandler = (req, res, next) => {
  if (req.url.includes('guestbook')) {

    const commentFile = './src/app/comments.json'
    const guestbook = new Guestbook(commentFile);

    req.guestbook = guestbook;
    return guestBook(req, res);
  }
  next();
};

module.exports = { guestBookHandler };
