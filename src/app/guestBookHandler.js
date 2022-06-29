const { Guestbook } = require('../app/commentSector');

const guestBook = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.searchParams) {
    req.guestbook.addComment(url.searchParams);
  }

  const content = req.guestbook.getContent();
  res.statuscode = 301;
  res.setHeader('content-type', 'text/html');
  res.end(content);
  return true;
};

const guestBookHandler = (req, res) => {
  if (req.url.includes('guestbook')) {
    console.log('im in');
    const commentFile = './src/app/comments.txt'
    const guestbook = new Guestbook(commentFile);

    req.guestbook = guestbook;
    return guestBook(req, res);
  }
  return false;
};

module.exports = { guestBookHandler };
