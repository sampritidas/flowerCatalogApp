const { createServer } = require('net');

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
  runServer(PORT);
};

main(process.argv[2]);
