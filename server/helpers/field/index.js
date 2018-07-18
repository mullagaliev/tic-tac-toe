const { MARKERS } = require('../../constants/markers');

const getEmptyField = function (size = 4) {
  const row = new Array(size).fill(MARKERS._);
  return new Array(size)
      .fill()
      .map(_ => row.slice());
};

module.exports = {
  getEmptyField
};
