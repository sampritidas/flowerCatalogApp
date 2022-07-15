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

const getSignUp = (req, res, next) => {
  res.end(signUpPage);
  next();
  return;
};

const postSignUp = users => (req, res, next) => {
  const newUser = getUserDetails(req.bodyParam.username);
  users[newUser.username] = newUser;

  res.redirect('/signUpSuccessMsg.html');
  res.end();
};

module.exports = { getSignUp, postSignUp };
