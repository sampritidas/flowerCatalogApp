const request = require('supertest');

const lib = require("../src/app/logInHandler.js");
const { bodyParser, cookieParser } = require('../src/app/parser.js');
const { signUpHandler } = require('../src/app/signUpHandler.js');
const { handle } = require('../src/server/handlers.js');
const { logOutHandler } = require('../src/app/logOutHandler.js');
const { serveFileHandler } = require("../src/app/serveFile.js");
const { apiHandler } = require("../src/catalogApi/apiHandler.js");
const { onFileNotFound } = require("../src/app/onFileNotFound.js");
const { guestBookHandler } = require("../src/app/guestBookHandler");
const { addCommentHandler } = require("../src/app/addCommentHandler.js");
const { injectSession, logInHandler } = lib;

const users = {};
const sessions = {};
const commentFile = './public/comments.json';
const guestTemplate = './src/app/guestTemplate.html';

const handlers = [
  bodyParser,
  cookieParser,
  injectSession(sessions),
  signUpHandler(users),
  logInHandler(users, sessions),
  logOutHandler(sessions),
  addCommentHandler(commentFile),
  // guestBookHandler(users, commentFile, guestTemplate),
  serveFileHandler,
  apiHandler,
  // onFileNotFound
];

describe('signUpHandler', () => {
  it('should give signup page on GET /signup', (done) => {
    request(handle(handlers))
      .get('/signup')

      .expect(/html/)
      .expect(200, done)
  });

  it('should give statusCode 302 on POST /signup', (done) => {
    request(handle(handlers))
      .post('/signup')
      .send('username=john')
      .set('Accept', 'application/json')

      .expect('location', '/login')
      .expect(/post/)
      .expect(302, done)
  })
});

describe('logInHandler', () => {
  it('should give logInPage on GET /login', (done) => {
    request(handle(handlers))
      .get('/login')

      .expect(/html/)
      .expect(200, done)
  });

  it('should set cookie on POST /login', (done) => {
    request(handle(handlers))
      .post('/login')
      .send('username=john')
      .set('Accept', 'application/json')

      .expect('set-cookie', /id/)
      .expect('location', '/guestbook')
      .expect(302, done)
  })

});

describe('logOutHandler', () => {
  it('should set cookie id 0, cookie max-age 0 and redirect to the login page', (done) => {
    request(handle(handlers))
      .get('/logout')

      .expect('set-cookie', /id=0/)
      .expect('location', '/login')
      .expect(302, done)
  });
});

describe('serveFileHandler', () => {
  it('should set content-type as "text/html" if filePath contains ".html"', (done) => {
    request(handle(handlers))
      .get('/')

      .expect('content-length', '1070')
      .expect('content-type', /html/)
      .expect(/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
