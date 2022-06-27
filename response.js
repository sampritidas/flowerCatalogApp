const CRLF = '\r\n';

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
    this.write(`${protocol} ${this.#statuscode}${CRLF}`);

    const headers = Object.entries(this.#header);
    headers.forEach(([key, value]) => {
      this.write(`${key}: ${value}${CRLF}`);
    });
  }

  send(protocol, content) {
    this.setHeader('content-length', content.length);
    this.writeHeaders(protocol);
    this.write(CRLF);
    this.write(content);
    this.end();
  }
}

module.exports = { Response };
