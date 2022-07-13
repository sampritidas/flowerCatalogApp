const http = require('http');

const server = (PORT, mainHandler) => {
  const httpServer = http.createServer((req, res) => {
    mainHandler(req, res);
  })

  httpServer.listen(PORT, () =>
    console.log(`listening to`, httpServer.address().port));
};

module.exports = { server };
