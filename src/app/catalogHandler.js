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
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};

const serveFileHandler = (filename, response) => {
  const contentType = getContentType(filename);
  const content = fs.readFileSync(filename);

  response.setHeader('content-type', contentType);
  response.end(content);
};

const onFileNotFound = (response) => {
  response.statusCode = 404;
  response.setHeader('content-type', 'text/plain');
  response.end('FILE NOT FOUND');
};

module.exports = { serveFileHandler, onFileNotFound };
