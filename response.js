class Response {
  #socket;
  #statuscode;
  #header;

  constructor(socket) {
    this.#socket = socket;
    this.#statuscode = 200;
    this.#header = {};
  }

  setHeader(key, value) {
    this.#header[key] = value;
  }

  write(response) {
    this.#socket.write(response);
  }

  set statuscode(code) {
    this.#statuscode = code;
  }

  end() {
    this.#socket.end();
  }

  writeHeaders(protocol) {
    this.write(`${protocol} ${this.#statuscode}\r\n`);

    const headers = Object.entries(this.#header);
    headers.forEach(([key, value]) => {
      this.write(`${key}: ${value}\r\n`);
    });
  }

  send(protocol, content) {
    this.setHeader('content-length', content.length);
    this.writeHeaders(protocol);
    this.write('\r\n');
    this.write(content);
    this.end();
  }
}

module.exports = { Response };
