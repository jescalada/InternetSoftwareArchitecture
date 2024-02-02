// Develop a server side nodejs service to get your name you sent via the browser's address bar,  greet you and return the current time of the server ( entire message in blue)*

const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello <b>World!</b>');
}).listen(8080);

console.log('Server running at http://localhost:8080/');