import { UPDATE_FIELD } from '../constants';

const defaultState = [[]];

export const fieldReducer = function (state = defaultState, { type, data }) {
  switch (type) {
    case UPDATE_FIELD:
      return data.field;
    default:
      return state;
  }
};

export default fieldReducer;
