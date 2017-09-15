class Marker{
  constructor(val = 'X'){
    this.val = val;
  }
  toString(){
    return this.val;
  }
}

let MARKERS = {
  X: new Marker('x'),
  O: new Marker('o'),
  // Default marker
  _: new Marker('_'),
};

module.exports = { Marker, MARKERS };