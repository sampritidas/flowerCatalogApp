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

const getLogInPage = (req, res, next) => res.end(logInPage);

const postLogIn = (users, sessions) => (req, res, next) => {
  const username = req.bodyParam.username;
  const session = createSession(username);

  if (!users[username]) {
    res.redirect('/signup');
    res.end();
    return;
  }

  sessions[session.id] = session;
  res.cookie('id', `${session.id}`);
  res.redirect('/guestbook');
  res.end();
  return;
}

module.exports = { injectSession, getLogInPage, postLogIn };
