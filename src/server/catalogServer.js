const { createServer } = require('net');
const { parseChunk } = require('../app/parseRequest');
const { Response } = require('../app/response');
const { flowerCatalog } = require('./catalogHandler');

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

module.exports = { runServer, flowerCatalog }; 
