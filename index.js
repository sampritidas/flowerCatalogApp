const { guestBookHandler } = require("./src/app/guestBookHandler");
const { server } = require("./src/server/server");
const { serveFileHandler, onFileNotFound } = require("./src/app/catalogHandler");

const handlers = [guestBookHandler, serveFileHandler, onFileNotFound];

const handle = (handlers) => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

const PORT = 5555;
server(PORT, handle(handlers));
