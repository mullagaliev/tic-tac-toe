import io from 'socket.io-client';
let ip = 'localhost';
const socket = io('http://' + ip + ':3001');

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
  onError, onInfo, onSuccess
};
