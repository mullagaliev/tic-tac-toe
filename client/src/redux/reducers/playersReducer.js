import { GAME_OVER, GAME_START, SWITCH_CURRENT_PLAYER } from '../constants';

const defaultState = {
  currentPlayer: null,
  winnerId: null,
  list: []
};

export const playersReducer = function (state = defaultState, { type, data }) {
      switch (type) {
        case GAME_OVER:
          return { ...state, ...{ winnerId: data.winnerId } };
        case SWITCH_CURRENT_PLAYER:
          return { ...state, ...{ currentPlayer: data.currentPlayer } };
        case GAME_START: {
          let list = [];
          list.push(data.client);
          list.push(data.host);
          return { ...state, list };
        }
        default:
          return state;
      }
    }
;

export default playersReducer;
