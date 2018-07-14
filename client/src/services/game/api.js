import io from 'socket.io-client';
import { SERVER_PATH } from '../../constants/config';
import { logger } from '../../helpers';

const socket = io(SERVER_PATH);

function onError(cb) {
  socket.on('gameError', (msg) => {
    logger('new any error');
    cb(null, msg);
  });
}

function onInfo(cb) {
  socket.on('gameInfo', (msg) => {
    logger('new any info');
    cb(null, msg);
  });
}

function onSuccess(cb) {
  socket.on('gameSuccess', (msg) => {
    logger('new any success info');
    cb(null, msg);
  });
}

export {
  onError, onInfo, onSuccess
};
