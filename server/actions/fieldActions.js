const updateFieldAction = (data = {}) => {
  return {
    type: 'updateField',
    data
  };
};

module.exports = { updateFieldAction };
