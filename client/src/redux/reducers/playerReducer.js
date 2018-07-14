const defaultState = {
  currentPlayer: null,
  winnerId: null
};

export const playerReducer = function (state = defaultState, { type, data }) {
      switch (type) {
        case 'gameOver':
          return { ...state, ...{ winnerId: data.winnerId } };
          /* PLAYERS */
        case 'switchCurrentPlayer':
          return { ...state, ...{ currentPlayer: data.currentPlayer } };
        default:
          return state;
      }
    }
;

export default playerReducer;
