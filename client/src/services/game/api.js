import io from 'socket.io-client';
let ip = 'localhost';
const socket = io('http://' + ip + ':3001');

function subscribeToUpdate(cb) {
  console.log('subscribe to update');
  socket.on('updateField', (newfield) => {
    console.log(newfield);
    cb(null, newfield);
  });
}

function subscribeToUpdatePlayer(cb) {
  socket.on('switchCurrentPlayer', (currentPlayerID) => {
    console.log('current' + currentPlayerID);
    cb(null, currentPlayerID);
  });
}

// TODO added board
function subscribeToGameEnd(cb) {
  socket.on('gameEnd', (PlayerID, isHost) => {
    console.log('winner' + PlayerID);
    cb(null, PlayerID, isHost);
  });
}

function newGame(roomId, cb) {
  console.log('new game');
  socket.emit('newGame', roomId, () => {
    cb();
  });
}

function say(roomId, message, cb) {
  console.log(roomId);
  socket.emit('message', roomId, message, cb);
  cb();
}

function onMessage(cb) {
  console.log('subscribe to message chat');
  socket.on('chatMessage', (msg) => {
    console.log('new any message');
    cb(null, msg);
  });
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

export {
  newGame,
  subscribeToUpdate, subscribeToUpdatePlayer,
  subscribeToGameEnd,
  say, onMessage,
  onError, onInfo, onSuccess
};
