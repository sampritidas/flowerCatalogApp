const lib = require("./src/app/logInHandler.js");
const { server } = require("./src/server/server.js");
const { guestBookHandler } = require("./src/app/guestBookHandler");
const { serveFileHandler } = require("./src/app/serveFile.js");
const { onFileNotFound } = require("./src/app/onFileNotFound.js");
const { bodyParser, injectCookie, injectSession, signInHandler } = lib;
const { handle } = require("./src/server/handlers.js");
const { addCommentHandler } = require("./src/app/addComment.js");
const { signOutHandler } = require("./src/app/logOutHandler");
const { signUpHandler } = require("./src/app/signUpHandler.js");

const logRequest = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

const users = {};
const sessions = {};

const handlers = [
  logRequest,
  bodyParser,
  injectCookie,
  injectSession(sessions),
  signUpHandler(users),
  signInHandler(users, sessions),
  signOutHandler(sessions),
  addCommentHandler,
  guestBookHandler,
  serveFileHandler,
  onFileNotFound
];

const PORT = 5555;
server(PORT, handle(handlers));
