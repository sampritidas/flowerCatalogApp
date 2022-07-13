const lib = require("./src/app/logInHandler.js");
const { server } = require("./src/server/server.js");
const { handle } = require("./src/server/handlers.js");
const { logOutHandler } = require("./src/app/logOutHandler");
const { serveFileHandler } = require("./src/app/serveFile.js");
const { signUpHandler } = require("./src/app/signUpHandler.js");
const { apiHandler } = require("./src/catalogApi/apiHandler.js");
const { onFileNotFound } = require("./src/app/onFileNotFound.js");
const { guestBookHandler } = require("./src/app/guestBookHandler");
const { bodyParser, cookieParser } = require("./src/app/parser.js");
const { addCommentHandler } = require("./src/app/addCommentHandler.js");
const { injectSession, logInHandler } = lib;


const logRequest = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

const commentFile = './public/comments.json';
const guestTemplate = './src/app/guestTemplate.html';
const users = {};
const sessions = {};

const handlers = [
  logRequest,
  bodyParser,
  cookieParser,
  injectSession(sessions),
  signUpHandler(users),
  logInHandler(users, sessions),
  logOutHandler(sessions),
  addCommentHandler(commentFile),
  guestBookHandler(users, commentFile, guestTemplate),
  serveFileHandler,
  apiHandler,
  onFileNotFound
];

const PORT = 5555;
server(PORT, handle(handlers));
