let { Logger } = require('./Logger');
let { MARKERS } = require('./Marker');

class Player{
  constructor(client, marker = MARKERS.X, isHost = true) {
    let id = (client.id).toString();
    this.id = id;
    this.name = id.toString().substr(0,6);
    this.current = false;
    this.marker = marker;
    this.room = 1;
    this.isHost = isHost;
    this.socket = client;
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
  getInfo(isCurrent){
    let info = {
      id: this.id,
      name: this.name,
      current: isCurrent,
      marker: this.marker.val,
      room: this.room,
      isHost: this.isHost
    };
    return info;
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