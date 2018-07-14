import {
  GAME_INFO,
  GAME_ERROR,
  GAME_SUCCESS,
  GAME_INFO_RESET
} from '../constants';

const defaultState = {
  type: 'none',
  text: '',
  isRead: true
};

export const infoReducer = function (state = defaultState, { type, data }) {
  switch (type) {
    case GAME_INFO:
      return { isRead: false, type: 'info', text: data };
    case GAME_ERROR:
      return { isRead: false, type: 'error', text: data };
    case GAME_SUCCESS:
      return { isRead: false, type: 'success', text: data };
    case GAME_INFO_RESET:
      return defaultState;
    default:
      return state;
  }
};

export default infoReducer;
