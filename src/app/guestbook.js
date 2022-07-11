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

const name = (queries) => queries.get('name');

const comment = (queries) => queries.get('comment');

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
  #appendFile;
  constructor(appendFile) {
    this.#appendFile = appendFile;
  }

  addComment(name, comment) {
    const newComment = modifyComment(name, comment);
    const comments = JSON.parse(readFile(this.#appendFile, 'utf8'));
    comments.push(newComment);

    writeFile(this.#appendFile, JSON.stringify(comments), 'utf8');
    return true;
  }

  getContent() {
    const placeHolder = '__TABLE_CONTENT__';

    const templateContent = readFile('./src/app/guestTemplate.html', 'utf8');
    const allComment = JSON.parse(readFile(this.#appendFile, 'utf8'));
    const formattedComment = formatComment(allComment);
    const content = templateContent.replace(placeHolder, formattedComment);
    return content;
  }
}

module.exports = { Guestbook };
