const CRLF = '\r\n';

const headerKey = (header, sliceIndex) => {
  return header.slice(0, sliceIndex).trim();
};

const headerValue = (header, sliceIndex) => {
  return header.slice(sliceIndex + 1).trim();
};

const separateByColon = (header) => {
  const indexOfColon = header.indexOf(':');
  const key = headerKey(header, indexOfColon);
  const value = headerValue(header, indexOfColon);
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

const parseRequestLine = (requestLine) => {
  const [verb, uri, protocol] = requestLine.split(' ');
  return { verb, uri, protocol: protocol.trim() };
};

const parseChunk = (chunk) => {
  const request = chunk.split(CRLF);
  const requestLine = parseRequestLine(request[0]);
  const headers = parseHeader(request.slice(1));
  return [requestLine, headers];
};


module.exports = { parseChunk, parseHeader, parseRequestLine, separateByColon };
