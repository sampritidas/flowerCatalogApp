const guestBookHandler = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.searchParams) {
    req.guestbook.addComment(url.searchParams);
  }

  const content = req.guestbook.getContent();
  console.log(content);
  res.statuscode = 301;
  res.setHeader('content-type', 'text/html');
  res.end(content);
  return true;
};

module.exports = { guestBookHandler };
