import { currentTime } from './time';

export const logger = function (msg) {
  let time = currentTime();
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${time}: ${msg}`);
  }
};

export default logger;
