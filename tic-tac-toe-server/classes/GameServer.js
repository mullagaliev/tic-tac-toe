let { Logger } = require('./Logger');
let { GameRoom } = require('./GameRoom');

class GameServer{
  constructor(name) {
    this.onlinePlayers = 0;
    this.onlineRooms = 0;
    this.rooms = [];
  }
  // BASE
  connectPlayer(client){
    let id = (client.id).toString();
    Logger.log(`Client Name: ${id}  connected to server...`);
    this.onlinePlayers++;

    let room = new GameRoom(client);
    this.rooms[room.id] = room;
  }
  disconnectPlayer(id){
    this.onlinePlayers--;
    if( this.onlinePlayers < 0){
      throw new FatalGameServerException(`Server online Players can't be < 0`);
    }
    Logger.log(`Client Name: ${id} disconnected...`);
  }
  // OTHER
  connectPlayerToRoom(roomId, client){
    let room = this.getRoomById(roomId);
    room.connectPlayer(client);
  }
  getRoomById(roomId){
    let room = this.rooms[roomId];
    if(!room){
      throw new GameServerException(`Room ${roomId} not found (room not exists)`);
    }
    return room;
  }
}

/**
 * Exceptions
 */
class GameServerException{
  constructor(message) {
    this.message = message;
    this.name = "Game server Exception";
  }
}

class FatalGameServerException extends GameServerException{
  constructor(message) {
    super(message, "Fatal game server Exception");
  }
}

module.exports = { GameServer };
