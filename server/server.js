const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { GameServer } = require('./classes/GameServer');
const { Logger } = require('./classes/Logger');

app.use(express.static(__dirname + '/bower_components'));

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

const gameServer = new GameServer({name: 'new server',io});
gameServer.run();

server.listen(3001);

console.log('server run...');
