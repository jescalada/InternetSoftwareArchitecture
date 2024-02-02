const http = require('http');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
    'Content-Type': 'application/json'
};

// Add a new route for get request
http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url === '/name') {
        res.writeHead(200, {...headers, 'Content-Type': 'text/html'});
        res.end('Hello <b>Juan Escalada!</b>');
    } else {
        res.writeHead(404, {...headers, 'Content-Type': 'text/html'});
        res.end('Not found');
    }
}).listen(443);

console.log('Server running at http://localhost:3000/');