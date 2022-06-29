const { runServer, flowerCatalog } = require('./src/server/catalogServer.js');

const main = (staticRoot) => {
  const PORT = 44444;
  runServer(PORT, staticRoot, flowerCatalog);
};

main(process.argv[2]);
