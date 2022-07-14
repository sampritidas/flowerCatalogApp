const request = require('supertest');
const { app } = require('../src/app/app.js');
const fs = require('fs');

const ReturnTrue = (ele) => {
  return true;
}

const testConfig = {
  'commentFile': './data/testComments.json',
  'guestTemplate': './src/app/guestTemplate.html',
  'logger': ReturnTrue,
}

const myApp = app(testConfig, {}, {});

describe('GET /signup', () => {
  it('should give signup page on GET /signup', (done) => {
    request(myApp)
      .get('/signup')

      .expect(/html/)
      .expect(200, done)
  });
});

describe('POST /signup', () => {
  it('should give statusCode 302 on POST /signup', (done) => {
    request(myApp)
      .post('/signup')
      .send('username=john')
      .set('Accept', 'application/json')

      .expect('location', '/signUpSuccessMsg.html')
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  })
});

describe('GET /login', () => {
  it('should give logInPage on GET /login', (done) => {
    request(myApp)
      .get('/login')

      .expect(/html/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('should set cookie on POST /login', (done) => {
    request(myApp)
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
    request(myApp)
      .get('/logout')

      .expect('set-cookie', /id=0/)
      .expect('location', '/login')
      .expect(302, done)
  });
});

describe('POST /addcomment', () => {
  beforeEach(() => {
    fs.writeFileSync(testConfig.commentFile, '[]');
  });

  it('should add comments with name in testComments.json on POST /addcomment', (done) => {
    request(myApp)
      .post('/addcomment')
      .send('name=john&comment=nice')

      .expect('content-length', '0')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /guestbook', () => {
  it('should redirect to login page in GET /guestbook if cookie not set', (done) => {
    request(myApp)
      .get('/guestbook')

      .expect('location', '/login')
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /guestbook', () => {
  it('should redirect to login page in GET /guestbook if cookie set', (done) => {
    const sessions = {
      '1234': {
        'id': '1234',
        'username': 'Sampriti',
        'date': 'Wed Jul 14 2022'
      }
    }

    const users = {
      'sampriti': { 'username': 'Sampriti' }
    };

    const myApp = app(testConfig, users, sessions)
    request(myApp)
      .post('/guestbook')
      .set('cookie', 'id=1234')
      .send('username=Sampriti')

      .expect(200)
      .expect(/html/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('serveFileHandler', () => {
  it('should set content-type as "text/html" if filePath contains ".html"', (done) => {
    request(myApp)
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
    request(myApp)
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
    request(myApp)
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
