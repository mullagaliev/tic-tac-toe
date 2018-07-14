class Marker {
  constructor(val = 'x') {
    this.val = val;
  }

  toString() {
    return this.val;
  }
}

const MARKERS = {
  X: new Marker('x'),
  O: new Marker('o'),
  // Default marker
  _: new Marker('_'),
};

module.exports = { Marker, MARKERS };