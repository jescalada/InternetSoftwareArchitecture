const http = require('http');

http.createServer(function (req, res) {
  console.log("The server received a request for " + req.url);
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
  });

  res.end("Server's response!");
}).listen(8888);