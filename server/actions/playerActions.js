const switchCurrentPlayerAction = (message) => {
  return {
    type: 'switchCurrentPlayer',
    data: message
  };
};

module.exports = { switchCurrentPlayerAction };
