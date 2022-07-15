const { createApp } = require("./src/app/app");
const config = {
  'commentFile': './data/comments.json',
  'guestTemplate': './src/app/guestTemplate.html',
  'logger': console.log,
}

const app = createApp(config, users = {}, sessions = {});
app.listen(4444, () => console.log('listening to the 4444'));
