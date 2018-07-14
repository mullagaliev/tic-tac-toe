import { GAME_STATUSES } from '../../constants';
import {
  ROOM_INIT,
  GAME_START,
  GAME_OVER,
  ROOM_DESTROY
} from '../constants';

const defaultState = GAME_STATUSES.NONE;

export const statusReducer = function (state = defaultState, { type }) {
  switch (type) {
    case ROOM_INIT:
      return GAME_STATUSES.INIT;
    case GAME_START:
      return GAME_STATUSES.STARTED;
    case GAME_OVER:
      return GAME_STATUSES.FINISH;
    case ROOM_DESTROY:
      return GAME_STATUSES.FINISH;
    default:
      return state;
  }
};

export default statusReducer;
