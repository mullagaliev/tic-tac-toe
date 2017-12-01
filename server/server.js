// app.js
let { GameServer } = require('./classes/GameServer');
let { Logger } = require('./classes/Logger');

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);


console.log('server run...');

app.use(express.static(__dirname + '/bower_components'));
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

let defaultField = [
  ['x', 'o', 'x', 'x'],
  ['x', '-', '-', 'o'],
  ['x', 'o', 'x', 'x'],
  ['x', '-', 'o', 'o']
];

let tmpFlag = true;
let counter = 0;

let gameServer = new GameServer();

io.on('connection', function (client) {
  // TODO remove it
  let marker = tmpFlag ? "x" : "o";
  let id = (client.id).toString();
  tmpFlag = !tmpFlag;

  gameServer.connectPlayer(client);

  client.on('action', (action) => {
    try{
      switch (action.type){
        case 'connectToRoom': {
          const {roomId} = action.data;
          gameServer.getRoomById(roomId).connectPlayer(client);
          break;
        }
        case 'doStep': {
          const {roomId, row, cell} = action.data;
          let room = gameServer.getRoomById(roomId);
          room.move(row, cell, client);
          break;
        }
        case 'disconnect': {
          gameServer.disconnectPlayer(client);
          break;
        }
      }
    }
    catch(e){
      Logger.log(e.message);
      client.emit('gameError', e.message);
    }
  });

  client.on('message', (roomId, message) => {
    try{
      gameServer.getRoomById(roomId).say(client, message);
    }
    catch(e){
      Logger.log(e.message);
      client.emit('gameError', e.message);
    }
  });

  client.on('newGame', (roomId) => {
    try{
      gameServer.getRoomById(roomId).newGame(client);
    }
    catch(e){
      Logger.log(e.message);
      client.emit('gameError', e.message);
    }
  });
  client.on('disconnect', () => {
    gameServer.disconnectPlayer(client);
  });
});


server.listen(3001);
