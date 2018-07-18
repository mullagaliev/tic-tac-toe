const { GameRoom } = require('./GameRoom');
const { gameErrorAction } = require('../actions/otherActions');
const { loggerInfo } = require('../helpers/logger');


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
          loggerInfo(e.message);
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
    loggerInfo(`Client Name: ${id}  connected to server...`);
    loggerInfo(`Online players: ${this.onlinePlayers}`);

    const room = new GameRoom(playerSocket);
    this.rooms[room.id] = room;
  }

  disconnect(client) {
    const roomsIds = Object.keys(this.rooms);

    roomsIds.forEach((key) => {
      this.getRoomById(key)
          .disconnectPlayer(client);
    });

    const id = client.id;
    this.onlinePlayers--;
    if (this.onlinePlayers < 0) {
      throw new FatalGameServerException(`Server online Players can't be < 0`);
    }
    loggerInfo(`Client Name: ${id} disconnected...`);
    loggerInfo(`Online players: ${this.onlinePlayers} `);
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
