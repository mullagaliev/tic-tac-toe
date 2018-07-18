const gameErrorAction = (message) => {
  return {
    type: 'gameError',
    data: message
  };
};

const gameInfoAction = (message) => {
  return {
    type: 'gameInfo',
    data: message
  };
};

module.exports = { gameErrorAction, gameInfoAction };
