const fs = require('fs');
const { guestBook } = require("../app/guestBookHandler");

const extentions = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
};

const getContentType = (filename) => {
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};

const path = (staticRoot, uri) => {
  return (staticRoot === undefined ? './public' : staticRoot) + uri;
};

const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, params] = rawUri.split('?');

  if (params) {
    const queries = params.split('&');
    queries.forEach((param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    });
  }
  return [uri, queryParams];
};

const serveFileHandler = (filename, protocol, response) => {
  const contentType = getContentType(filename);
  console.log('type', contentType);

  const content = fs.readFileSync(filename);

  response.setHeader('content-type', contentType);
  response.send(protocol, content);
  return true;
};

const onNonExistFile = (protocol, response) => {
  response.statuscode = 404;
  response.send(protocol, 'file not found');
  return false;
};

const flowerCatalog = ({ uri, protocol }, response, staticRoot) => {
  let [parsedUri, queries] = parseUri(uri);
  console.log(parsedUri);

  if (parsedUri === '/') {
    parsedUri = '/htmls/catalog.html';
  }
  if (parsedUri.includes('/guest-book')) {
    return guestBook(response, protocol, queries);
  }

  const filename = path(staticRoot, parsedUri);
  console.log(filename);
  if (fs.existsSync(filename)) {
    return serveFileHandler(filename, protocol, response);
  }

  return onNonExistFile(protocol, response);
};

module.exports = { flowerCatalog };
