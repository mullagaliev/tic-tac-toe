const newMessageAction = (data = {}) => {
  const date = (new Date);
  const { playerId, isYour = false, message = '' } = data;
  const name = playerId.substr(0, 5);

  return {
    type: 'newMessage',
    data: {
      isYour,
      date,
      name,
      playerId,
      message
    }
  };
};

module.exports = { newMessageAction };
