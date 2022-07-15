const fs = require('fs');

const serveHome = (req, response, next) => {
  const filepath = './public/catalog.html';
  if (!fs.existsSync(filepath)) {
    next();
    return;
  }
  const content = fs.readFileSync(filepath);
  response.end(content);
};

module.exports = { serveHome };
