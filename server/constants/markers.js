const { Marker } = require('../classes/Marker');

const MARKERS = {
  X: new Marker('x'),
  O: new Marker('o'),
  // Default marker
  _: new Marker('_'),
};

module.exports = { MARKERS };
