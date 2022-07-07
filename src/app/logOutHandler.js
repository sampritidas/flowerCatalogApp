const deleteSession = (req, sessions) => {
  const cookieId = req.cookie.id;
  delete sessions[cookieId];
};

const signOutHandler = (sessions) => {
  return (req, res, next) => {
    if (req.url === '/logout' && req.method === 'GET') {
      deleteSession(req, sessions);

      res.statusCode = 302;
      res.setHeader('set-cookie', "id=0; max-age=0");
      res.setHeader('Location', '/login');
      res.end();
      return;
    }
    next();
  }
};

module.exports = { signOutHandler };