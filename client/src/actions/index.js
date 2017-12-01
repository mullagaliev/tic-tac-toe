import * as ACTION_TYPES from '../constants/actionsTypes';

export default function action(type, fields = []) {
  return { type, ...fields };
}

export const authLogin = (fields = []) => action(ACTION_TYPES.LOGIN_FETCH_REQUESTED, ...fields);
export const authLogout = () => action(ACTION_TYPES.LOGOUT_FETCH_REQUESTED, {});
