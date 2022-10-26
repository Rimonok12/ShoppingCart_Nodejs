//http Server:
const http = require('http');
//--------------------------------------- Server -----------------------------------------//

const server = http.createServer((req, res) => {
  //   console.log(req);
  res.end('Hello From The Server!!!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started TO LIstening on 8000');
});
