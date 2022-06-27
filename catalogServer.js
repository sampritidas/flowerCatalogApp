const fs = require('fs');
const { createServer } = require('net');
const { Response } = require('./response');

const extentions = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
}

const getContentType = (filename) => {
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};


const path = (staticRoot, uri) => {
  return (staticRoot === undefined ? '.' : staticRoot) + uri;
};


const getNewComment = (queries) => {
  const date = new Date();
  const { name, comment } = queries;
  console.log(date, name, comment);
  return `${date} : ${name} \n\t\t ${comment}`;
};


const readFile = (filename) => {
  return fs.readFileSync(filename, 'utf8');
};

const appendFile = (filename, content) => {
  fs.appendFileSync(filename, content, 'utf8');
};

const updateCommentList = (newComment) => {
  appendFile('comments.txt', newComment);
  const allComments = readFile('./comments.txt');
  const guestBookContent = readFile('./guestBook.html')
  return guestBookContent.replace('_COMMENTS_', allComments);
};


const guestBook = (response, protocol, queries) => {
  const newComment = getNewComment(queries);
  const content = updateCommentList(newComment);
  console.log(content);
  response.statuscode = 301;
  response.setHeader('content-type', 'text/html');
  response.send(protocol, content);
  return true;
};


const flowerCatalog = ({ uri, protocol }, response, staticRoot) => {
  if (uri === '/') {
    uri = '/index.html';
  }
  if (uri.includes('/guest-book')) {
    return guestBook(response, protocol, queries);
  }

  const filename = path(staticRoot, uri);
  console.log('path', filename);

  if (!fs.existsSync(filename)) {
    response.statuscode = 404;
    response.send(protocol, 'file not found');
    return false;
  }

  const contentType = getContentType(filename);
  console.log('type', contentType);

  const content = fs.readFileSync(filename);

  response.setHeader('content-type', contentType);
  response.send(protocol.trim(), content);
  return true;
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
