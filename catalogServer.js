const fs = require('fs');
const { createServer } = require('net');
const { parseChunk } = require('./parseRequest');
const { Response } = require('./response');

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

const catalog = (response, protocol, queries) => {
  const content = fs.readFileSync('catalog.html', 'utf8');
  console.log(content);
  response.setHeader('content-type', 'text/html');
  response.statuscode = 200;
  response.send(protocol, content);
  return true;
};

const flowerCatalog = ({ protocol, uri }, response, staticRoot) => {
  console.log(uri, response);
  const [parsedUri, queries] = parseUri(uri);
  console.log(parsedUri, queries);
  if (parsedUri === '/catalog') {
    return catalog(response, protocol.trim());
  }
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
