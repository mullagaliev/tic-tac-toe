import io from 'socket.io-client';
let ip = '192.168.88.27';
const socket = io('http://' + ip + ':3001');

function subscribeToUpdate(cb) {
  console.log('subscribe to update');
  socket.on('updateField', (newfield) => {
    console.log(newfield);
    cb(null, newfield);
  });
}

function subscribeToRoomInit(cb) {
  console.log('subscribe to room init');
  socket.on('roomInit', (room) => {
    console.log('room init');
    cb(null, room);
  });
}

function subscribeToRoomReady(cb) {
  console.log('subscribe to room ready');
  socket.on('roomReady', (roomInfo) => {
    console.log('room ready');
    cb(null, roomInfo);
  });
}

function subscribeToRoomDestroy(cb) {
  console.log('subscribe to room destroy');
  socket.on('roomDestroy', (room) => {
    console.log('room desroy');
    cb(null, room);
  });
}

function subscribeToUpdatePlayer(cb) {
  socket.on('switchCurrentPlayer', (currentPlayerID) => {
    console.log('current' + currentPlayerID);
    cb(null, currentPlayerID);
  });
}

function subscribeToGameEnd(cb) {
  socket.on('gameEnd', (PlayerID) => {
    console.log('winner' + PlayerID);
    cb(null, PlayerID);
  });
}

function Move(roomId, row, cell, cb) {
  console.log('do step');
  socket.emit('doStep', roomId, row, cell, () =>{
    cb();
  });
}

function connect(link, cb) {
  let roomId = link.split('/').slice(-1)[0];
  console.log(roomId);
  socket.emit('connectToRoom', roomId, cb);
  cb();
}

function onError(cb) {
  console.log('subscribe to error init');
  socket.on('gameError', (msg) => {
    console.log('new any error');
    cb(null, msg);
  });
}

function onInfo(cb) {
  console.log('subscribe to error init');
  socket.on('gameInfo', (msg) => {
    console.log('new any info');
    cb(null, msg);
  });
}

function onSuccess(cb) {
  console.log('subscribe to error init');
  socket.on('gameSuccess', (msg) => {
    console.log('new any success info');
    cb(null, msg);
  });
}

export { connect,
  subscribeToUpdate, subscribeToUpdatePlayer,
  subscribeToRoomInit, subscribeToRoomReady, subscribeToRoomDestroy,
  subscribeToGameEnd,
  Move,
  onError, onInfo, onSuccess };
