const field = require('./field');
const logger = require('./logger');
const winner = require('./winner');

module.exports = {
  ...field,
  ...logger,
  ...winner
};
