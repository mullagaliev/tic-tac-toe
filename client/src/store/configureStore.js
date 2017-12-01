import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import _ from 'lodash';

// import rootReducer from '../reducers';


const initField = (size = 4) => {
  return _.times(size, () => {
    return _.times(size, () => {
      return { val: '_' };
    });
  });
};


const defaultState = {
  user: {
    id: 134,
    name: 'Andrew'
  },
  room: {
    field: initField(4),
    roomInfo: null,
    players: []
  },
  field: [[]],
  messages: []
};

function reducer(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
      /* FIELD */
    case 'updateField':
      return Object.assign({}, state, { field: action.data.field });
      /* ROOM */
    case 'roomInit':
    case 'roomReady':
      return Object.assign({}, state, { room: action.data });
    case 'roomDestroy':
      return Object.assign({}, state, { room: null });
      /* CHAT */
    case 'newMessage': {
      const newMessages = Object.assign([], state.messages);
      newMessages.push(action.data.message);
      return Object.assign({}, state, { messages: newMessages });
    }
    default:
      return state;
  }
}

const ip = 'localhost';
const socket = io('http://' + ip + ':3001');
let socketIoMiddleware = createSocketIoMiddleware(socket, '');

const middleware = [socketIoMiddleware];


export default function configureStore(initialState) {
  const store = createStore(
      reducer,
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
