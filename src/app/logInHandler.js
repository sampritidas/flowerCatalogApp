const logInPage = `<html>
<head>
  <title>
    Login
  </title>
</head>
<body>
  <form action="login" method="POST">
    <label for="username">USERNAME</label>
    <input type="text" name="username" id="username">
    <input type="submit" value="LOGIN">
  </form>
</body>
</html>`;

const createSession = (username) => {
  return { username, id: new Date().getTime(), date: new Date() };
};

const bodyParser = (req, res, next) => {
  let rawChunk = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    rawChunk += chunk;
  });
  req.on('end', () => {
    const bodyParam = new URLSearchParams(rawChunk);
    req.bodyParam = bodyParam;
    next();
  });
};

const cookieParser = cookieString => {
  const cookies = {};
  if (!cookieString) {
    return cookies;
  }
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  })
  return cookies;
};

const injectCookie = (req, res, next) => {
  req.cookie = cookieParser(req.headers.cookie);
  next();
};

const injectSession = sessions => {
  return (req, res, next) => {
    req.sessions = sessions;
    next();
  };
};

const redirectToHomePage = (res, location) => {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
  return;
}

const signInHandler = (users, sessions) => {
  return (req, res, next) => {
    const sessionId = req.headers.cookie?.split('=')[1];

    if (req.url !== '/login') {
      next();
      return;
    }

    if (req.sessions[sessionId]) {
      return redirectToHomePage(res, '/');
    }

    if (req.url === '/login' && req.method === 'GET') {
      res.end(logInPage);
      return;
    }

    if (req.url === '/login' && req.method === 'POST') {
      const username = req.bodyParam.get('username');
      const session = createSession(username);

      if (!users[username]) {
        return redirectToHomePage(res, '/signup');
      }

      sessions[session.id] = session;
      res.setHeader('set-cookie', `id=${session.id}`);
      return redirectToHomePage(res, '/');
    }
  };
};

module.exports = { injectCookie, injectSession, bodyParser, signInHandler };
