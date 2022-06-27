const separateByColon = (header) => {
  const indexOfColon = header.indexOf(':');
  const key = header.slice(0, indexOfColon).trim();
  const value = header.slice(indexOfColon + 1).trim();
  return [key.toLowerCase(), value];
};

const parseHeader = (header) => {
  const headers = {};
  let index = 0;
  while (index < header.length && header[index].length > 0) {
    const [key, value] = separateByColon(header[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

function parseChunk(chunk) {
  const request = chunk.split('\r\n');
  const requestLine = parseRequestLine(request[0]);
  const headers = parseHeader(request.slice(1));
  return [requestLine, headers];
};

const parseRequestLine = (requestLine) => {
  const [verb, uri, protocol] = requestLine.split(' ');
  return { verb, uri, protocol };
};

module.exports = { parseChunk, parseHeader, parseRequestLine, separateByColon };
