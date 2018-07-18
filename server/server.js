const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { GameServer } = require('./classes/GameServer');

app.use(express.static(__dirname + '/bower_components'));

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

const gameServer = new GameServer({ name: 'new server', io });
gameServer.run();

server.listen(3001);

console.log('server run...');
