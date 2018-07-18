const roomInitAction = (data = {}) => {
  return {
    type: 'roomInit',
    data
  };
};

const roomDestroyAction = (data = {}) => {
  return {
    type: 'roomDestroy',
    data
  };
};

const gameStartAction = (data = {}) => {
  return {
    type: 'gameStart',
    data
  };
};

const gameStopAction = (data = {}) => {
  return {
    type: 'stopGame',
    data
  };
};

const gameOverAction = (data = {}) => {
  return {
    type: 'gameOver',
    data
  };
};


module.exports = {
  roomInitAction,
  roomDestroyAction,
  gameStartAction,
  gameStopAction,
  gameOverAction
};
