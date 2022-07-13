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

const logInHandler = (users, sessions) => {
  return (req, res, next) => {
    const sessionId = req.cookie.id;

    if (req.url !== '/login') {
      next();
      return;
    }

    if (req.sessions[sessionId]) {
      return redirectToHomePage(res, '/guestbook');
    }

    if (req.method === 'GET') {
      res.end(logInPage);
      return;
    }

    const username = req.bodyParam.get('username');
    const session = createSession(username);

    if (!users[username]) {
      return redirectToHomePage(res, '/signup');
    }

    sessions[session.id] = session;
    res.setHeader('set-cookie', `id=${session.id}`);
    return redirectToHomePage(res, '/guestbook');
  };
};

module.exports = { injectSession, logInHandler };
