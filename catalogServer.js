const fs = require('fs');
const { createServer } = require('net');
const { guestBook } = require("./guestBookHandler");
const { parseChunk } = require('./parseRequest');
const { Response } = require('./response');

const extentions = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
}

const getContentType = (filename) => {
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};

const path = (staticRoot, uri) => {
  return (staticRoot === undefined ? '.' : staticRoot) + uri;
};

const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, params] = rawUri.split('?');

  if (params) {
    const queries = params.split('&');
    queries.forEach((param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    })
  }
  return [uri, queryParams];
};


const contentCreator = (filename, protocol, response) => {
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

  if (parsedUri === '/') {
    parsedUri = '/htmls/catalog.html';
  }
  if (parsedUri.includes('/guest-book')) {
    return guestBook(response, protocol, queries);
  }

  const filename = path(staticRoot, parsedUri);
  console.log('path', filename);

  if (!fs.existsSync(filename)) {
    return onNonExistFile(protocol, response);
  }

  return contentCreator(filename, protocol, response);
};


const runServer = (PORT, staticRoot, handler) => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const [requestLine] = parseChunk(chunk.toString());
      const response = new Response(socket);
      handler(requestLine, response, staticRoot);
    })
  });

  server.listen(PORT, () => console.log(`Listening to ${PORT}`));
};


const main = (staticRoot) => {
  const PORT = 44444;
  runServer(PORT, staticRoot, flowerCatalog);
};

main(process.argv[2]);
