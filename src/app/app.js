const lib = require("./logInHandler.js");
const { logRequest } = require("./logRequest.js");
const { handle } = require("../server/handle.js");
const { logOutHandler } = require("./logOutHandler");
const { serveFileHandler } = require("./serveFile.js");
const { signUpHandler } = require("./signUpHandler.js");
const { onFileNotFound } = require("./onFileNotFound.js");
const { guestBookHandler } = require("./guestBookHandler");
const { bodyParser, cookieParser } = require("./parser.js");
const { apiHandler } = require("../catalogApi/apiHandler.js");
const { addCommentHandler } = require("./addCommentHandler.js");
const { injectSession, logInHandler } = lib;

const app = ({ commentFile, guestTemplate, logger }, users, sessions) => {
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

module.exports = { app };
