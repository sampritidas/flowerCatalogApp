const fs = require('fs');

const modifyString = (string) => {
  return string.split('+').join(' ')
};

const getNewComment = (queries) => {
  const date = (new Date() + '').slice(0, 15);
  const time = (new Date() + '').slice(16, 21);
  const { name, comment } = queries;
  const modifyComment = modifyString(comment);
  const modifyName = modifyString(name);
  console.log(date, name, comment);
  return `${date} [${time}]: <strong>${modifyName}</strong> ---> \n\t\t ${modifyComment}\n`;
};

const readFile = (filename) => {
  return fs.readFileSync(filename, 'utf8');
};

const appendFile = (filename, content) => {
  fs.appendFileSync(filename, content, 'utf8');
};

const attachTag = (comment) => {
  return `<div class="comment">${comment}</div>`
};

const updateCommentList = (newComment) => {
  const tagQuote = '<div class="last-greet">_THANKYOU_VISIT_AGAIN_</div>';
  const commentTag = attachTag(newComment);
  const guestBookContent = readFile('./htmls/guestBook.html');
  return guestBookContent.replace(tagQuote, commentTag + tagQuote);
};


const guestBook = (response, protocol, queries) => {
  const newComment = getNewComment(queries);
  const content = updateCommentList(newComment);
  fs.writeFileSync('./htmls/guestBook.html', content, 'utf8');
  response.statuscode = 301;
  response.setHeader('content-type', 'text/html');
  response.send(protocol, content);
  return true;
};

module.exports = { guestBook };
