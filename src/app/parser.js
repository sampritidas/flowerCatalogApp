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

module.exports = { bodyParser, cookieParser };
