import GAME_STATUSES from '../constants/gameStatuses';

const defaultState = {
  gameStatus: GAME_STATUSES.NONE,
  currentPlayer: null,
  room: {
    id: null,
    client: null,
    host: null,
    link: '',
    scores: []
  },
  field: [[]],
  messages: [],
  winnerId: null
};

export const reducers = function (state = defaultState, action) {
  switch (action.type) {
      /* FIELD */
    case 'updateField':
      return Object.assign({}, state, { field: action.data.field });
      /* ROOM */
    case 'roomInit':
    case 'gameStart':
      return Object.assign({}, state, {
        room: action.data,
        gameStatus: GAME_STATUSES.STARTED
      });
    case 'gameOver':
      return Object.assign({}, state, {
        winnerId: action.data.winnerId,
        gameStatus: GAME_STATUSES.FINISH
      });
    case 'roomDestroy':
      return Object.assign({}, state, { room: null });
      /* PLAYERS */
    case 'switchCurrentPlayer':
      return Object.assign({}, state, { currentPlayer: action.data.currentPlayer });
      /* CHAT */
    case 'newMessage': {
      const newMessages = Object.assign([], state.messages);
      newMessages.push(action.data);
      return Object.assign({}, state, { messages: newMessages });
    }
    default:
      return state;
  }
};

export default reducers;
