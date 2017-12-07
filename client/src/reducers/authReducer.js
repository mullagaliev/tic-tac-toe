import * as ACTION_TYPES from '../constants/actionsTypes';
import REQUEST_STATUSES from '../constants/requestStatuses';

const defaultState = {
  isAuth: 1,
  email: null,
  lastError: null,
  requestStatus: REQUEST_STATUSES.NONE
};

function authReducer(state = defaultState, action) {
  const { type } = action;

  switch (type) {
    case ACTION_TYPES.LOGIN:
      return state;
    default:
      return state;
  }
}

export default authReducer;
