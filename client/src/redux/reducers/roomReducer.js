import {
  ROOM_INIT,
  GAME_START,
  ROOM_DESTROY
} from '../constants';

const defaultState = {
  id: null,
  client: null,
  host: null,
  link: '',
  level: 1
};

export const roomReducer = function (state = defaultState, { type, data }) {
  switch (type) {
    case ROOM_INIT:
    case GAME_START:
      return { ...state, ...data };
    case ROOM_DESTROY:
      return defaultState;
    default:
      return state;
  }
};

export default roomReducer;
