const { Guestbook } = require('./guestbook.js');

const guestBook = (req, res) => {
  const content = req.guestbook.getContent();
  res.statuscode = 301;
  res.setHeader('content-type', 'text/html');
  res.end(content);
};

const redirect = (path, req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', path);
  res.end();
};

const guestBookHandler = users => (req, res, next) => {
  if (req.url.includes('guestbook')) {
    if (!req.sessions[req.cookie.id]) {
      redirect('/login', req, res);
      return;
    }
    const commentFile = './src/app/comments.json'
    const guestbook = new Guestbook(commentFile);

    req.guestbook = guestbook;
    return guestBook(req, res);
  }
  next();
};

module.exports = { guestBookHandler };
