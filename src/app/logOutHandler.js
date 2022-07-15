const deleteSession = (req, sessions) => {
  const cookieId = req.cookie.id;
  delete sessions[cookieId];
};

const logOutHandler = (sessions) => {
  return (req, res, next) => {
    if (req.url === '/logout' && req.method === 'GET') {
      deleteSession(req, sessions);

      res.clearCookie('id', '0');
      res.clearCookie('max-age', '0');
      res.redirect('/login');
      res.status(302).end();
      return;
    }
    next();
  }
};

module.exports = { logOutHandler };
