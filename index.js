const { app } = require("./src/app/app.js");
const { server } = require("./src/server/server.js");

const config = {
  'commentFile': './data/comments.json',
  'guestTemplate': './src/app/guestTemplate.html',
  'users': {},
  'logger': console.log,
}

const PORT = 5555;
server(PORT, app(config, sessions = {}));
