const fs = require('fs');

const extentions = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.gif': 'imaghes/gif',
};

const getContentType = (filename) => {
  console.log(filename);
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};

const serveFileHandler = (req, response) => {
  let filepath = './public' + req.url;

  if (filepath === './public/') {
    filepath = filepath + 'catalog.html';
  }
  if (!fs.existsSync(filepath)) {
    return false;
  }

  console.log(filepath);
  const contentType = getContentType(filepath);
  const content = fs.readFileSync(filepath);

  response.setHeader('content-type', contentType);
  response.end(content);
  return true;
};

const setErrorOnNonExistFile = (req, response) => {
  response.statusCode = 404;
  response.setHeader('content-type', 'text/plain');
  response.end('FILE NOT FOUND');
};

const onFileNotFound = (req, res) => {
  const filepath = './public' + req.url;
  if (!fs.existsSync(filepath)) {
    setErrorOnNonExistFile(req, res);
    return true;
  }
  return false;
};

module.exports = { serveFileHandler, onFileNotFound };
