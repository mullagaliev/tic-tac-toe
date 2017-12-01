import authReducer from './authReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: authReducer
});

export default rootReducer;
