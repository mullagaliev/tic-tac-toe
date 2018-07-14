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

const gameServer = new GameServer();

io.on('connection', function (client) {
  gameServer.connect(client);

  client.on('action', (action) => {
    try {
      switch (action.type) {
          /* ROOM */
        case 'connectToRoom': {
          const { roomId } = action.data;
          gameServer.connectToRoom(roomId, client);
          break;
        }
        case 'doStep': {
          const { roomId, row, cell } = action.data;
          gameServer.move(roomId, row, cell, client);
          break;
        }
        case 'newGame': {
          const { roomId } = action.data;
          gameServer.newGame(roomId, client);
          break;
        }
        case 'disconnect': {
          gameServer.disconnect(client);
          break;
        }
          /* CHAT */
        case 'message': {
          const {
            roomId, message, cb = () => {
            }
          } = action.data;
          gameServer.say(roomId, client, message);
          cb();
          break;
        }
      }
    }
    catch (e) {
      Logger.log(e.message);
      client.emit('gameError', e.message);
    }
  });

  client.on('disconnect', () => {
    gameServer.disconnect(client);
  });
});

server.listen(3001);

console.log('server run...');
