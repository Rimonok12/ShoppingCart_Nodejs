//http Server:
const http = require('http');

//-------_ROUTING----------

const url = require('url');

//--------------------------------------- Server -----------------------------------------//

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === '/overview') {
    res.end('Welcome To Overview page');
  } else if (pathName === '/product') {
    res.end('Welcome To Product Page');
  } else if (pathName === '/') {
    res.end('Welcome to  The ROOT Server!!!');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not Found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started TO LIstening on 8000');
});
