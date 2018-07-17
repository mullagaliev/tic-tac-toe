const { MARKERS } = require('../../constants/markers');
const { loggerInfo } = require('../logger');

const getHorizontalWinnerMarker = function (field) {
  const rows = field.filter((row) => {
    return row[0] === row[1]
        && row[1] === row[2]
        && row[2] === row[3];
  });
  return rows[0] ? rows[0][0] : MARKERS._;
};

const getVerticalWinnerMarker = function (field) {
  for (let keyCol = 0; keyCol < field.length; keyCol++) {
    if (field[0][keyCol] === field[1][keyCol]
        && field[1][keyCol] === field[2][keyCol]
        && field[2][keyCol] === field[3][keyCol]
        && field[0][keyCol] !== MARKERS._) {
      return field[0][keyCol];
    }
  }
  return MARKERS._;
};

const getDiagonalWinnerMarker = function (field) {
  if (field[0][0] === field[1][1]
      && field[1][1] === field[2][2]
      && field[2][2] === field[3][3]
      && field[0][0] !== MARKERS._) {
    return field[0][0];
  }
  if (field[0][3] === field[1][2]
      && field[1][2] === field[2][1]
      && field[2][1] === field[3][0]
      && field[0][3] !== MARKERS._) {
    return field[0][3];
  }
  return MARKERS._;
};

const getWinnerMarker = function (field) {
  if (!Boolean(field)) {
    return MARKERS._;
  }
  const hw = getHorizontalWinnerMarker(field);
  const vw = getVerticalWinnerMarker(field);
  const dw = getDiagonalWinnerMarker(field);

  loggerInfo(`Current game field status h - ${hw} v - ${vw} d - ${dw}`);

  if (hw !== MARKERS._) {
    return hw;
  }
  if (vw !== MARKERS._) {
    return vw;
  }
  if (dw !== MARKERS._) {
    return dw;
  }
  return MARKERS._;
};

module.exports = {
  getWinnerMarker,
  getHorizontalWinnerMarker,
  getDiagonalWinnerMarker,
  getVerticalWinnerMarker
};
