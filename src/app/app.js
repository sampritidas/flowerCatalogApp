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
const { apiComments, apiSearch } = require("../catalogApi/apiHandler.js");
const { guestbookInitialize } = require("./guestBookHandler.js");
const { injectSession, getLogIn, postLogIn } = lib;


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

  app.get('/signup', getSignUp);
  app.post('/signup', postSignUp(users));

  app.get('/login', getLogIn);
  app.post('/login', postLogIn(users, sessions));

  app.use(guestbookInitialize(guestbook));                //guestBookInitialize

  app.get(/guestbook/, serveGuestBook(users, commentFile, guestTemplate));
  app.get('/logout', logOutHandler({}));
  app.post('/addcomment', addComment);
  app.get('/', serveHome);
  app.get('/api/comments', apiComments);
  app.get('/api/search', apiSearch);

  return app;
}

module.exports = { createApp };
