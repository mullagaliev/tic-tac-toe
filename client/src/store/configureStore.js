import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducers from './reducers';
import { SERVER_PATH } from '../constants/config';

const socket = io(SERVER_PATH);
let socketIoMiddleware = createSocketIoMiddleware(socket, '');

const middleware = [socketIoMiddleware];

export default function configureStore(initialState) {
  const store = createStore(
      reducers,
      initialState,
      applyMiddleware(
          ...middleware
      )
  );

  store.subscribe(() => {
    console.log('new client state', store.getState());
  });
  store.dispatch({ type: 'hello', data: 'Hello!' });
  return store;
}
