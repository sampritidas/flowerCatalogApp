const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(filename, 'utf8');
};

const appendFile = (filename, content) => {
  fs.appendFileSync(filename, content, 'utf8');
};

const modifyString = (string) => {
  return string.split('+').join(' ')
};

const attachTag = (comment) => {
  return `<div class="comment">${comment}</div>`
};

class CommentSection {
  #comments;
  #filename;
  constructor(filename) {
    this.#filename = filename;
    this.#comments = {};
  }

  addComment(queries) {
    const date = (new Date() + '').slice(0, 15);
    const time = (new Date() + '').slice(16, 21);
    const { name, comment } = queries;
    const modifyComment = modifyString(comment);
    const modifyName = modifyString(name);
    const newComment = `${date} [${time}]: <strong>${modifyName}</strong> ---> \n\t\t ${modifyComment}\n`;
    const commentTag = attachTag(newComment); //should be in getCommets
    fs.appendFileSync('comments.txt', commentTag, 'utf8');
    return true;
  }

  getComments() {
    const tagQuote = '<div class="last-greet">_THANKYOU_VISIT_AGAIN_</div>';
    const guestBookContent = readFile('./htmls/guestBook.html');
    const allComment = readFile('./comments.txt', 'utf8');
    return guestBookContent.replace(tagQuote, allComment + tagQuote);
  }
}

module.exports = { CommentSection };