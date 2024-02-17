const http = require('http');
const url = require('url');
const dictionary = {}

let requestNumber = 0;

// Allow CORS
const allowCORS = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
}

const server = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Send the response
    res.setHeader('Content-Type', 'application/json');
    allowCORS(req, res);

    requestNumber++;

    // If the path is /api/definitions
    if (path === '/api/definitions') {
        if (method === 'get') {
            if (queryStringObject.word) {
                if (dictionary[queryStringObject.word]) {
                    res.end(JSON.stringify({ definition: dictionary[queryStringObject.word], requestNumber }));
                } else {
                    res.end(JSON.stringify({ error: 'Word not found', requestNumber }));
                }
            } else {
                res.end(JSON.stringify({ error: 'Missing word', requestNumber }));
            }
        } else if (method === 'post') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                const parsedBody = JSON.parse(body);

                const word = parsedBody.word;
                const definition = parsedBody.definition;
            
                if (word && definition) {
                  if (!dictionary[word]) {
                      dictionary[word] = definition;
                      res.end(JSON.stringify({ success: `${word} was added to the dictionary`, requestNumber }));
                  } else {
                      res.end(JSON.stringify({ error: `${word} already exists`, requestNumber }));
                  }
              } else {
                  res.end(JSON.stringify({ error: 'Missing word or definition', requestNumber }));
              }
            });
        }
    // If the path is not /api/definitions
    } else {
        res.end(JSON.stringify({ error: 'Invalid path', requestNumber }));
    }
});

server.listen(7777, () => {
    console.log('Server is listening on port 7777');
});
