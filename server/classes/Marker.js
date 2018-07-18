class Marker {
  constructor(val = 'x') {
    this.val = val;
  }

  toString() {
    return this.val;
  }
}

module.exports = { Marker };
