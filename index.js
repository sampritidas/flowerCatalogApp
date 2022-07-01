const { server } = require("./src/server/server.js");
const { guestBookHandler } = require("./src/app/guestBookHandler");
const { serveFileHandler } = require("./src/app/serveFile.js");
const { onFileNotFound } = require("./src/app/onFileNotFound.js");
const { handle } = require("./src/server/handlers.js");
const { addCommentHandler } = require("./src/app/addComment.js");

const handlers = [
  addCommentHandler,
  guestBookHandler,
  serveFileHandler,
  onFileNotFound
];

const PORT = 5555;
server(PORT, handle(handlers));
