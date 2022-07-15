const injectBody = (req, res, next) => {
  req.bodyParam = req.body;
  next();
}

const cookieParser = (req, res, next) => {
  const cookie = {};
  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach(element => {
      const [name, value] = element.split('=');
      cookie[name] = value;
    })
  }
  req.cookie = cookie;
  next();
};

module.exports = { cookieParser, injectBody };
