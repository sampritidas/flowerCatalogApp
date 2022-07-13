const { Guestbook } = require('./guestbook.js');

const guestBook = (req, res) => {
  req.guestbook.initialize();

  const content = req.guestbook.getContent();
  res.statuscode = 301;
  res.setHeader('content-type', 'text/html');
  res.end(content);
  return;
};

const redirect = (path, req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', path);
  res.end();
};

const guestBookHandler = (users, commentFile, template) => (req, res, next) => {
  const guestbook = new Guestbook(commentFile, template);
  guestbook.initialize();
  comments = guestbook.getComments();
  req.comments = comments;

  if (req.url.includes('guestbook')) {
    if (!req.sessions[req.cookie.id]) {
      redirect('/login', req, res);
      return;
    }

    req.guestbook = guestbook;
    return guestBook(req, res);
  }
  next();
  return;
};

module.exports = { guestBookHandler };
