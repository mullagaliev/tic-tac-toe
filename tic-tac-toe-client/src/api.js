import io from 'socket.io-client';
let ip = '192.168.88.27';
const socket = io('http://' + ip + ':3001');

function subscribeToUpdate(cb) {
  console.log('subscribe to update');
  socket.on('updateField', (newfield) => {
    console.log(newfield);
    cb(null, newfield);
  });
  // socket.emit('subscribeToUpdateField');
}

function doStep(row, cell, cb) {
  socket.emit('doStep', row, cell, cb);
  console.log('do step');
  cb();
}

function subscribeToSwitchCurrentPlayer(cb) {
  socket.on('switchCurrentPlayer', (currentPlayerID) => {
    console.log('current' + currentPlayerID);
    cb(null, currentPlayerID);
  });
}

export { subscribeToUpdate, doStep, subscribeToSwitchCurrentPlayer };
