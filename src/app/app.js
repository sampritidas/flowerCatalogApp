const express = require('express');
const { Guestbook } = require('./guestbook.js');

const lib = require("./logInHandler.js");
const { logRequest } = require('./logRequest.js');
const { logOutHandler } = require("./logOutHandler");
const { serveHome } = require('./serveFile.js')
const { addComment } = require("./addCommentHandler.js");
const { serveGuestBook } = require("./guestBookHandler.js");
const { cookieParser, injectBody } = require("./parser.js");
const { getSignUp, postSignUp } = require("./signUpHandler.js");
const { fetchComments, searchByName } = require("../catalogApi/apiHandler.js");
const { guestbookInitialize } = require("./guestBookHandler.js");
const { injectSession, getLogInPage, postLogIn } = lib;


const createApp = ({ commentFile, guestTemplate, logger }, users, sessions) => {
  app = express();
  const guestbook = new Guestbook(commentFile, guestTemplate);

  app.use(express.text());
  app.use(express.json());
  app.use(express.raw());
  app.use(express.static('public'));                           //staticFileServe
  app.use(logRequest(logger));
  app.use(express.urlencoded({ extended: true }));
  app.use(injectBody);                                         //bodyParser
  app.use(cookieParser);                                       //cookieParser
  app.use(injectSession(sessions = {}));

  const logInRouter = express.Router();                        //logInRouter
  logInRouter.get('/', getLogInPage);
  logInRouter.post('/', postLogIn(users, sessions));

  const signUpRouter = express.Router();                       //signUpRouter
  signUpRouter.get('/', getSignUp);
  signUpRouter.post('/', postSignUp(users));

  const apiRouter = express.Router();                           //apiRouter
  apiRouter.get('/comments', fetchComments);
  apiRouter.get('/search', searchByName);

  app.use('/login', logInRouter);
  app.use('/signup', signUpRouter);
  app.use(guestbookInitialize(guestbook));                //guestBookInitialize
  app.use('/api', apiRouter);

  app.get(/guestbook/, serveGuestBook(users, commentFile, guestTemplate));
  app.get('/logout', logOutHandler({}));
  app.post('/addcomment', addComment);
  app.get('/', serveHome);

  return app;
}

module.exports = { createApp };
