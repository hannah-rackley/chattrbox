const WS = require('ws'); 
const fs = require('fs');
const http = require('http');

let server = http.createServer((req, res) => {
    let file = "/frontend/" + req.url.slice(1);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.end(data);
        }
    })
});

server.listen(3001);

let WebSocketServer = new WS.Server({server: server});

WebSocketServer.on('connection', client => {
    client.on('message', message => {
        WebSocketServer.clients.forEach(client => {
            client.send(message);
        });
    })
})

