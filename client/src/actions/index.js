// import * as ACTION_TYPES from '../constants/actionsTypes';

export default function action(type, data = {}) {
  console.log(type, data);
  return { type, data };
}

export const newGame = (roomId) => action('newGame', { roomId });
