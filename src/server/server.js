const http = require('http');

const server = (PORT, handler) => {
  const httpServer = http.createServer((req, res) => {
    handler(req, res);
  })

  httpServer.listen(PORT, () =>
    console.log(`listening to`, httpServer.address().port));
};

module.exports = { server };
