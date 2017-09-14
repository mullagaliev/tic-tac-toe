let { Logger } = require('./Logger');
let { Player } = require('./Player');
let { MARKERS } = require('./Marker');

class GameRoom{
  constructor(host) {
    let idHost = (host.id).toString();
    let hostPLayer = new Player(host);

    this.id = `room-${idHost}`;
    this.host = hostPLayer;
    this.client = null;

    host.join(this.id);
    Logger.log(`room (${this.id}) created for player ${idHost}`);
  }
  connectPlayer(client){
    let clientPLayer = new Player(client, MARKERS.O);

    if(this.host.id === clientPLayer.id){
      throw new GameRoomException(`Can't connect to yourself`);
    }
    if(this.host.marker === clientPLayer.marker){
      throw new FatalGameRoomException(`Can't use equal markers`);
    }
    this.client = clientPLayer;
    client.join(this.id);

    Logger.log(`Client ${idClient} connected to room ${this.id}...`);
  }
  ready(){
    return this.host && this.client;
  }
}

/**
 * Exceptions
 */
class GameRoomException{
  constructor(message) {
    this.message = message;
    this.name = "Game room Exception";
  }
}

class FatalGameRoomException extends GameRoomException{
  constructor(message) {
    super(message, "Fatal game room Exception");
  }
}


module.exports = { GameRoom };
