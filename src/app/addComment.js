const { Guestbook } = require("./guestbook");

const redirect = (path, req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', path);
  res.end();
};

const addComment = (req, res) => {
  let rawChunk = '';
  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    rawChunk += chunk;
  })

  req.on('end', () => {
    const newComment = new URLSearchParams(rawChunk);

    console.log(newComment);
    req.guestbook.addComment(newComment);
  })
  redirect('/guestbook', req, res);
};

const addCommentHandler = (req, res, next) => {
  if (req.url.includes('addcomment')) { //check if post

    const commentFile = './src/app/comments.json'
    const guestbook = new Guestbook(commentFile);

    req.guestbook = guestbook;
    return addComment(req, res);
  }
  next();
};

module.exports = { addCommentHandler };
