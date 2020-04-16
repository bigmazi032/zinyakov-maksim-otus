const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const timeOut = 100; // задержка ответа
const OK = 200;

const server = http.createServer((req, res) => {
    res.statusCode = OK;
    res.setHeader('Content-Type', 'text/plain');
    setTimeout(()=>{res.end('Hello World');}, timeOut)
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});