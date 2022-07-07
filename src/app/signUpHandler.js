const signUpPage = `<html>
<head>
  <title>
    Login
  </title>
</head>
<body>
  <form action="signup" method="POST">
    <label for="username">USERNAME</label>
    <input type="text" name="username" id="username">
    <input type="submit" value="SIGNUP">
  </form>
</body>
</html>`;

const getUserDetails = (username) => {
  return { username };
};

const signUpHandler = (users) => (req, res, next) => {
  if (req.url === '/signup' && req.method === 'GET') {
    res.end(signUpPage);
    return;
  }
  if (req.url === '/signup' && req.method === 'POST') {
    const newUser = getUserDetails(req.bodyParam.get('username'));
    users[newUser.username] = newUser;
    res.statusCode = 302;
    res.setHeader('Location', '/login');
    res.end();
    return;
  }
  next();

};

module.exports = { signUpHandler };