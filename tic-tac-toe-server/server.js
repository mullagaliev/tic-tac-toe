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
  let marker = tmpFlag ? "x" : "o";
  let id = (client.id).toString();
  tmpFlag = !tmpFlag;
  gameServer.connectPlayer(client);

  try{
    gameServer.connectPlayerToRoom(`room-${id}`, client);
  }
  catch(e){
    Logger.log(e.message);
  }

  // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
  //client.json.send({'event': 'connected', 'name': ID, 'time': time});

  // client.on('join', function(data) {
  //     console.log(data);
  //     client.on('messages', function(data) {
  //         client.emit('broad', data);
  //         client.broadcast.emit('broad',data);
  //     });
  // });

  client.on('subscribeToUpdateField', () => {
    console.log('client is subscribing to update field ');
    setInterval(() => {
    }, 1000);
  });

  client.on('doStep', (row, cell, cb) => {
    console.log('client ' + ID + ' do step: ' + row + " " + cell);
    defaultField[row][cell] = marker;
    //console.log(client.broadcast);
    client.to('room').emit('updateField', defaultField);
    client.emit('updateField', defaultField);

    counter++;
    let current = counter % 2 === 0 ? 1 : 2;
    console.log(current);

    client.to('room').emit('switchCurrentPlayer', current);
    client.emit('switchCurrentPlayer', current);
  });
  client.on('disconnect', function(){
    gameServer.disconnectPlayer(id);
  });
});


server.listen(3001);