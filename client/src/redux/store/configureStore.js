import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import { SERVER_PATH } from '../../constants/config';

const socket = io(SERVER_PATH);
const socketIoMiddleware = createSocketIoMiddleware(socket, '');


export default function configureStore(initialState) {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(
          socketIoMiddleware,
          logger
      )
  );
}
