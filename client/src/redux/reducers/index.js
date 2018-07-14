import { combineReducers } from 'redux';
import { statusReducer as gameStatus } from './gameStatusReducer';
import { roomReducer as room } from './roomReducer';
import { fieldReducer as field } from './fieldReducer';
import { playerReducer as players } from './playerReducer';
import { messagesReducer as messages } from './messagesReducer';

const rootReducer = combineReducers({
  gameStatus,
  room,
  field,
  players,
  messages
});

export default rootReducer;
