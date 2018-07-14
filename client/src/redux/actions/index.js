import {
  CONNECT_TO_ROOM,
  NEW_GAME,
  DO_STEP,
  SEND_MESSAGE
} from '../constants';

export default function action(type, data = {}) {
  return { type, data };
}

export const connectToRoom = (roomId, cb) => action(CONNECT_TO_ROOM, { roomId, cb });
export const newGame = (roomId) => action(NEW_GAME, { roomId });
export const doStep = (roomId, row, cell, cb) => action(DO_STEP, { roomId, row, cell, cb });
export const sendMessage = (roomId, message, cb) => action(SEND_MESSAGE, { roomId, message, cb });
