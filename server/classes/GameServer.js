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

  disconnect(client) {
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

    const id = client.id;
    this.onlinePlayers--;
    if (this.onlinePlayers < 0) {
      throw new FatalGameServerException(`Server online Players can't be < 0`);
    }
    Logger.log(`Client Name: ${id} disconnected...`);
    Logger.log(`Online players: ${this.onlinePlayers} `);
  }

  // OTHER
  getRoomById(roomId) {
    const room = this.rooms[roomId];
    if (!room) {
      throw new GameServerException(`Room ${roomId} not found (room not exists)`);
    }
    return room;
  }

  connect(playerSocket) {
    const id = playerSocket.id;
    this.players[id] = playerSocket;
    this.onlinePlayers++;
    Logger.log(`Client Name: ${id}  connected to server...`);
    Logger.log(`Online players: ${this.onlinePlayers} `);

    const room = new GameRoom(playerSocket);
    this.rooms[room.id] = room;
  }

  connectToRoom(roomId, playerSocket) {
    return this.getRoomById(roomId)
        .connectPlayer(playerSocket);
  }

  move(roomId, row, cell, playerSocket) {
    return this.getRoomById(roomId)
        .move(row, cell, playerSocket);
  }

  say(roomId, playerSocket, message) {
    return this.getRoomById(roomId)
        .say(playerSocket, message);
  }

  newGame(roomId, playerSocket) {
    return this.getRoomById(roomId)
        .newGame(playerSocket);
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
