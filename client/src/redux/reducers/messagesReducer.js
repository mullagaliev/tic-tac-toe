import { NEW_MESSAGE } from '../constants';
const defaultState = [];

export const messagesReducer = function (state = defaultState, { type, data }) {
  switch (type) {
    case NEW_MESSAGE: {
      const newMessages = state.slice();
      newMessages.push(data);
      return newMessages;
    }
    default:
      return state;
  }
};

export default messagesReducer;
