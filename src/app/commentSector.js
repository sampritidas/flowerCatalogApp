const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(filename, 'utf8');
};

const appendFile = (filename, content) => {
  fs.appendFileSync(filename, content, 'utf8');
};

const attachTag = (comment) => {
  return `<div class="comment">${comment}</div>`
};

const date = () => (new Date() + '').slice(0, 15);

const time = () => (new Date() + '').slice(16, 21);

const name = (queries) => queries.get('name');

const comment = (queries) => queries.get('comment');


class Guestbook {
  #appendFile;
  constructor(appendFile) {
    this.#appendFile = appendFile;
  }

  addComment(queries) {
    console.log('quesries', queries);

    const newComment =
      `${date()} [${time()}]:
       <strong>${name(queries)}</strong> ---> ${comment(queries)}\n`;

    const commentTag = attachTag(newComment);

    appendFile(this.#appendFile, commentTag, 'utf8');
    return true;
  }

  getContent() {
    const tagQuote = '<div class="last-greet">_THANKYOU_VISIT_AGAIN_</div>';

    const templateContent = readFile('./src/app/guestTemplate.html', 'utf8');
    const allComment = readFile(this.#appendFile, 'utf8');
    const content = templateContent.replace(tagQuote, allComment + tagQuote);
    return content;
  }
}

module.exports = { Guestbook };