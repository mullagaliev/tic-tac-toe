// app.js
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

console.log('server run...');

app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.on('messages', function(data) {
            client.emit('broad', data);
            client.broadcast.emit('broad',data);
        });
    });

});

server.listen(3001);