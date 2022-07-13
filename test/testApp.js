const request = require('supertest');
const { app } = require('../src/app/app.js');
const fs = require('fs');

const ReturnTrue = (ele) => {
  return true;
}

const testConfig = {
  'commentFile': './data/comments.json',
  'guestTemplate': './src/app/guestTemplate.html',
  'users': {},
  'logger': ReturnTrue,
}

describe('GET /signup', () => {
  it('should give signup page on GET /signup', (done) => {
    request(app(testConfig, {}))
      .get('/signup')

      .expect(/html/)
      .expect(200, done)
  });
});

describe('POST /signup', () => {
  it('should give statusCode 302 on POST /signup', (done) => {
    request(app(testConfig, {}))
      .post('/signup')
      .send('username=john')
      .set('Accept', 'application/json')

      .expect('location', '/login')
      .expect(/post/)
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  })
});

describe('GET /login', () => {
  it('should give logInPage on GET /login', (done) => {
    request(app(testConfig, {}))
      .get('/login')

      .expect(/html/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('should set cookie on POST /login', (done) => {
    request(app(testConfig, {}))
      .post('/login')
      .send('username=john')
      .set('Accept', 'application/json')

      .expect('set-cookie', /id/)
      .expect('location', '/guestbook')
      .expect(302, done)
  })
});

describe('GET /logout', () => {
  it('should set cookie id 0, cookie max-age 0 and redirect to the login page', (done) => {
    request(app(testConfig, {}))
      .get('/logout')

      .expect('set-cookie', /id=0/)
      .expect('location', '/login')
      .expect(302, done)
  });
});

describe('serveFileHandler', () => {
  it('should set content-type as "text/html" if filePath contains ".html"', (done) => {
    request(app(testConfig, {}))
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

describe('GET /api/comments', () => {
  it('should give all comments from json on GET /api/comments', (done) => {
    request(app(testConfig, {}))
      .get('/api/comments')

      .expect('content-length', '74')
      .expect(/john/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /api/search', () => {
  it('should give specific comments from json on GET /api/search', (done) => {
    request(app(testConfig, {}))
      .get('/api/search?name=john')

      .expect('content-length', '74')
      .expect(/john/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
