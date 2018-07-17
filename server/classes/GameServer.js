const _ = require('lodash');
const { Logger } = require('./Logger');
const { GameRoom } = require('./GameRoom');
const { gameErrorAction } = require('../actions/otherActions');


class GameServer {
  constructor({ io = null }) {
    this.io = io;

    this.onlinePlayers = 0;
    this.onlineRooms = 0;
    this.rooms = {};
    this.players = {};
  }

  run() {
    this.io.on('connection', (client) => {
      this.connect(client);

      client.on('action', ({ type = 'noneActionType', data = {} }) => {
        try {
          switch (type) {
              /* ROOM */
            case 'connectToRoom': {
              const { roomId } = data;
              this.connectToRoom(roomId, client);
              break;
            }
            case 'doStep': {
              const { roomId, row, cell } = data;
              this.move(roomId, row, cell, client);
              break;
            }
            case 'newGame': {
              const { roomId } = data;
              this.newGame(roomId, client);
              break;
            }
            case 'disconnect': {
              this.disconnect(client);
              break;
            }
              /* CHAT */
            case 'message': {
              const {
                roomId, message, cb = () => {
                }
              } = data;
              this.say(roomId, client, message);
              cb();
              break;
            }
          }
        }
        catch (e) {
          Logger.log(e.message);
          client.emit('action', gameErrorAction(e.message));
        }
      });

      client.on('disconnect', () => {
        this.disconnect(client);
      });
    });
  }

  connect(playerSocket) {
    if (!Boolean(playerSocket)) {
      throw new GameServerException('playerSocket is empty');
    }

    const id = playerSocket.id;
    this.players[id] = playerSocket;
    this.onlinePlayers++;
    Logger.log(`Client Name: ${id}  connected to server...`);
    Logger.log(`Online players: ${this.onlinePlayers}`);

    const room = new GameRoom(playerSocket);
    this.rooms[room.id] = room;
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
