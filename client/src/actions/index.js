// import * as ACTION_TYPES from '../constants/actionsTypes';

export default function action(type, data = {}) {
  console.log(type, data);
  return { type, data };
}

export const connectToRoom = (roomId, cb) => action('connectToRoom', { roomId, cb });
export const newGame = (roomId) => action('newGame', { roomId });
export const doStep = (roomId, row, cell, cb) => action('doStep', { roomId, row, cell, cb });
export const sendMessage = (roomId, message, cb) => action('message', { roomId, message, cb });
