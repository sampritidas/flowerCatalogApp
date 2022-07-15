const guestBook = (req, res) => {
  const content = req.guestbook.getContent();
  res.status(200);
  res.set('content-type', 'text/html');
  res.end(content);
  return;
};

const serveGuestBook = (users, commentFile, template) => (req, res, next) => {
  if (!req.sessions[req.cookie.id]) {
    res.redirect('/signup');
    res.end();
    return;
  }
  return guestBook(req, res);
};

const guestbookInitialize = guestbook => (req, res, next) => {
  guestbook.initialize();
  comments = guestbook.getComments();
  req.comments = comments;
  req.guestbook = guestbook;
  next();
}

module.exports = { serveGuestBook, guestbookInitialize };
