let { Logger } = require('./Logger');
let { MARKERS } = require('./Marker');

class Player{
  constructor(client, marker = MARKERS.X) {
    let id = (client.id).toString();
    this.id = id;
    this.name = "Andrew";
    this.current = true;
    this.marker = marker;
    this.room = 1;

    this.client = client;

    Logger.log(` Player ${this} created...`);
  }
  swapMarkers(otherPlayer){
    let tmpMarker = otherPlayer.marker;
    otherPlayer.marker = this.marker;
    this.marker = tmpMarker;
    if(this.marker === otherPlayer.marker){
      throw new FatalPlayerException(`Player ${this} and Other Player ${otherPlayer} have same markers`);
    }
    Logger.log(`Player ${this} swapped marker with Player ${otherPlayer}`);
  }
  toString(){
    return `(Number: ${this.id}, Name: ${this.name}, Marker ${this.marker})`;
  }
}

/**
 * Exceptions
 */
class PlayerException{
  constructor(message) {
    this.message = message;
    this.name = "Player Exception";
  }
}

class FatalPlayerException extends PlayerException{
  constructor(message) {
    super(message, "Fatal player Exception");
  }
}

module.exports = { Player };
