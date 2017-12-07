let { Logger } = require('./Logger');
let { GameRoom } = require('./GameRoom');
let _ = require('lodash');

class GameServer {
  constructor(name) {
    this.onlinePlayers = 0;
    this.onlineRooms = 0;
    this.rooms = {};
    this.players = {};
  }

  // BASE
  connectPlayer(client) {
    let id = (client.id).toString();
    this.players[id] = client;
    this.onlinePlayers++;
    Logger.log(`Client Name: ${id}  connected to server...`);
    Logger.log(`Online players: ${this.onlinePlayers} `);

    let room = new GameRoom(client);
    this.rooms[room.id] = room;
  }

  disconnectPlayer(client) {
    let roomsIds = _.keys(this.rooms);
    roomsIds.forEach((key) => {
      try {
        this.rooms[key].disconnectPlayer(client);
        delete this.rooms[key];
      }
      catch (e) {
        Logger.log(e.message);
      }
    });

    let id = client.id.toString();
    this.onlinePlayers--;
    if (this.onlinePlayers < 0) {
      throw new FatalGameServerException(`Server online Players can't be < 0`);
    }
    Logger.log(`Client Name: ${id} disconnected...`);
    Logger.log(`Online players: ${this.onlinePlayers} `);
  }

  // OTHER
  getRoomById(roomId) {
    let room = this.rooms[roomId];
    if (!room) {
      throw new GameServerException(`Room ${roomId} not found (room not exists)`);
    }
    return room;
  }
}

/**
 * Exceptions
 */
class GameServerException {
  constructor(message) {
    this.message = message;
    this.name = "Game server Exception";
  }
}

class FatalGameServerException extends GameServerException {
  constructor(message) {
    super(message, "Fatal game server Exception");
  }
}

module.exports = { GameServer };
