const chatActions = require('./chatActions');
const fieldActions = require('./fieldActions');
const otherActions = require('./otherActions');
const playerActions = require('./playerActions');
const roomActions = require('./roomActions');

module.exports = {
  ...chatActions,
  ...fieldActions,
  ...otherActions,
  ...playerActions,
  ...roomActions
};
