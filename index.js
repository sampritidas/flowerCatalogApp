const { server } = require("./src/server/server.js");
const { guestBookHandler } = require("./src/app/guestBookHandler");
const { serveFileHandler } = require("./src/app/serveFile.js");
const { onFileNotFound } = require("./src/app/onFileNotFound.js");
const { handle } = require("./src/server/handlers.js");
const { addCommentHandler } = require("./src/app/addComment.js");

const logInPage = `<html>
<head>
  <title>
    Login
  </title>
</head>
<body>
  <form action="login" method="POST">
    <label for="username">USERNAME</label>
    <input type="text" name="username" id="username">
    <input type="submit" value="LOGIN">
  </form>
</body>
</html>`;

const createSession = (username) => {
  return { username, id: new Date().getTime(), date: new Date() };
};

const bodyParser = (req, res, next) => {
  let rawChunk = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    rawChunk += chunk;
  })
  req.on('end', () => {
    const bodyParam = new URLSearchParams(rawChunk);
    req.bodyParam = bodyParam;
    next();
  })
}

const sessions = {};

const signInHandler = (req, res, next) => {
  if (req.url === '/login' && req.method === 'GET') {
    if (req.session === undefined) {
      res.end(logInPage);
      return;
    }
    req.statusCode = 302;
    req.setHeader('Location', '/');
    req.end();
    return;
  }
  if (req.url === '/login' && req.method === 'POST') {
    const cookie = createSession(req.bodyParam.get('username'));

    res.setHeader('set-cookie', `id=${cookie.id}`);
    sessions[cookie.id] = cookie;

    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
    return;
  }
  next();
}

const logRequest = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
}

const handlers = [
  logRequest,
  bodyParser,
  signInHandler,
  addCommentHandler,
  guestBookHandler,
  serveFileHandler,
  onFileNotFound
];

const PORT = 5555;
server(PORT, handle(handlers));
