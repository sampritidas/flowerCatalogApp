const fs = require('fs');

// const extentions = {
//   '.html': 'text/html',
//   '.jpeg': 'image/jpeg',
//   '.jpg': 'image/jpeg',
//   '.png': 'image/png',
//   '.pdf': 'application/pdf',
//   '.gif': 'imaghes/gif',
//   '.json': 'application/json'
// };

// const getContentType = (filename) => {
//   const indexOfExtention = filename.lastIndexOf('.');
//   const extention = filename.slice(indexOfExtention);
//   return extentions[extention] ? extentions[extention] : 'text/plain';
// };

const serveFileHandler = (req, response, next) => {
  let filepath = './public' + req.url;

  if (req.url === '/') {
    filepath = filepath + 'catalog.html';
  }
  if (!fs.existsSync(filepath)) {
    next();
    return;
  }

  const content = fs.readFileSync(filepath);

  response.end(content);
};

module.exports = { serveFileHandler };
