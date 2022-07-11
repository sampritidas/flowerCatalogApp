const lib = require("./src/app/logInHandler.js");
const { server } = require("./src/server/server.js");
const { handle } = require("./src/server/handlers.js");
const { signOutHandler } = require("./src/app/logOutHandler");
const { serveFileHandler } = require("./src/app/serveFile.js");
const { signUpHandler } = require("./src/app/signUpHandler.js");
const { addCommentHandler } = require("./src/app/addComment.js");
const { onFileNotFound } = require("./src/app/onFileNotFound.js");
const { guestBookHandler } = require("./src/app/guestBookHandler");
const { bodyParser, injectSession, signInHandler, cookieParser } = lib;

const logRequest = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

const users = {};
const sessions = {};

const handlers = [
  logRequest,
  bodyParser,
  cookieParser,
  injectSession(sessions),
  signUpHandler(users),
  signInHandler(users, sessions),
  signOutHandler(sessions),
  addCommentHandler,
  guestBookHandler(users),
  serveFileHandler,
  onFileNotFound
];

const PORT = 5555;
server(PORT, handle(handlers));
