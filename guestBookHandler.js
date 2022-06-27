const fs = require('fs');

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

  const guestBookContent = readFile('./guestBook.html');
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

module.exports = { guestBook };
