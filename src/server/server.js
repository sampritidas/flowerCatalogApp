const fs = require('fs');
const http = require('http');
const { serveFileHandler, onFileNotFound } = require('../app/catalogHandler');
const { Guestbook } = require('../app/commentSector');
const { guestBookHandler } = require('../app/guestBookHandler');

const fileRouter = (req, res) => {
  let filepath = './public' + req.url;

  if (filepath === './public/') {
    filepath = filepath + 'catalog.html';
  }
  if (req.url.includes('guestbook')) {
    console.log('im in');
    const commentFile = './src/app/comments.txt'
    const guestbook = new Guestbook(commentFile);

    req.guestbook = guestbook;
    return guestBookHandler(req, res);
  }

  console.log(filepath, req.url);
  if (!fs.existsSync(filepath)) {
    onFileNotFound(res);
    return true;
  }

  serveFileHandler(filepath, res);
  return true;
};

const server = (PORT) => {
  const httpServer = http.createServer((req, res) => {
    fileRouter(req, res);
  })

  httpServer.listen(PORT, () =>
    console.log(`listening to`, httpServer.address().port));
};

module.exports = { server };
