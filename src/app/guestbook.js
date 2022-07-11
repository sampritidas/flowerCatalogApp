const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(filename, 'utf8');
};

const writeFile = (filename, content) => {
  fs.writeFileSync(filename, content, 'utf8');
};

const tr = (row) => `<tr>${row}</tr>`;

const td = (data) => `<td>${data}</td>`;

const date = () => (new Date() + '').slice(0, 15);

const time = () => (new Date() + '').slice(16, 21);

const formatComment = (comments) => {
  const allComments = comments.map(({ date, time, name, comment }) => {
    const tdata = `${td(date)}${td(time)}${td(name)}${td(comment)}`;
    return tr(tdata);
  });
  return allComments.join('\n');
};

const modifyComment = (name, comment) => {
  return {
    date: date(),
    time: time(),
    name, comment,
  }
};

class Guestbook {
  #writeFile;
  #template;
  #comments;
  constructor(writeFile, template) {
    this.#writeFile = writeFile;
    this.#template = template;
    this.#comments;
  }

  addComment(name, comment) {
    const newComment = modifyComment(name, comment);
    const comments = this.#comments;

    comments.push(newComment);

    writeFile(this.#writeFile, JSON.stringify(comments), 'utf8');
    return comments;
  }

  getContent() {
    const placeHolder = '__TABLE_CONTENT__';
    const templateContent = readFile(this.#template);
    const allComments = this.#comments;

    const formattedComment = formatComment(allComments);
    const content = templateContent.replace(placeHolder, formattedComment);
    return content;
  }

  initialize() {
    const allComments = JSON.parse(readFile(this.#writeFile));
    this.#comments = allComments;
    return;
  }

  getComments() {
    return this.#comments;
  }
}

module.exports = { Guestbook };
