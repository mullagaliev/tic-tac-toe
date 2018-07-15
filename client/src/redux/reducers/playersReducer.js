import { GAME_OVER, GAME_START, SWITCH_CURRENT_PLAYER } from '../constants';

const defaultState = {
  isCurrent: false,
  currentPlayer: null,
  winnerId: null,
  list: [],
  myMarker: '_'
};

export const playersReducer = function (state = defaultState, { type, data }) {
      switch (type) {
        case GAME_OVER:
          return { ...state, winnerId: data.winnerId };
        case SWITCH_CURRENT_PLAYER:
          return {
            ...state,
            currentPlayer: data.currentPlayer,
            isCurrent: data.isCurrent
          };
        case GAME_START: {
          let list = [];
          list.push(data.host);
          list.push(data.client);
          list = list.sort((a, b) => a.current < b.current);
          return { ...state, list };
        }
        default:
          return state;
      }
    }
;

export const playerReducer = function (state = null, { type, data }) {
  switch (type) {
    case GAME_START: {
      let list = [];
      list.push(data.client);
      list.push(data.host);
      const myInfo = list.filter(player => player.current)[0];
      return myInfo;
    }
    default:
      return state;
  }
};

export default {
  playersReducer,
  playerReducer
};
