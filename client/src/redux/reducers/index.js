import { combineReducers } from 'redux';
import { statusReducer as gameStatus } from './gameStatusReducer';
import { roomReducer as room } from './roomReducer';
import { fieldReducer as field } from './fieldReducer';
import { playersReducer as players, playerReducer as player } from './playersReducer';
import { messagesReducer as messages } from './messagesReducer';
import { infoReducer as info } from './infoReducer';

const rootReducer = combineReducers({
  gameStatus,
  room,
  field,
  player,
  players,
  messages,
  info
});

export default rootReducer;
