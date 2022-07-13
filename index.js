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


const logRequest = logger => (req, res, next) => {
  logger(new Date(), req.method, req.url);
  next();
};

const config = {
  'commentFile': './data/comments.json',
  'guestTemplate': './src/app/guestTemplate.html',
  'users': {},
  'logger': console.log,
}

const app = ({ commentFile, guestTemplate, users, logger }, sessions) => {
  const handlers = [
    logRequest(logger),
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
  const mainHandler = handle(handlers);
  return (req, res) => mainHandler(req, res);
}

const PORT = 5555;
server(PORT, app(config, sessions = {}));
