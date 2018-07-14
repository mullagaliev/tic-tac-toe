const { Logger } = require('./Logger');
const { Player } = require('./Player');
const { Game } = require('./Game');

const { MARKERS } = require('./Marker');

class GameRoom {
  constructor(host) {
    const idHost = host.id;
    const hostPlayer = new Player(host);
    this.id = `room-${idHost}`;
    this.link = 'http://localhost:3000/connect/' + this.id; // TODO so bad
    this.host = hostPlayer;
    this.client = null;
    this.game = null;
    this.scores = {};

    // TODO add members
    this.players = [];
    this.players
        .push(hostPlayer);

    host.join(this.id, () => {
      host.emit('roomInit', this.getInfo());
      const action = {
        type: 'roomInit',
        data: this.getInfo()
      };
      host.emit('action', action);
    });
    Logger.log(`room (${this.id}) created for player ${idHost}`);
  }

  connectPlayer(client) {
    let clientPLayer = new Player(client, MARKERS.O, false);
    if (this.host.id === clientPLayer.id) {
      throw new GameRoomException(`Can't connect to yourself`);
    }
    // Connect to Full Room
    if (this.isFull()) {
      throw new GameRoomException(`Can't connect to full room`);
    }
    if (this.host.marker === clientPLayer.marker) {
      throw new FatalGameRoomException(`Can't use equal markers`);
    }
    this.client = clientPLayer;
    client.join(this.id, () => {
      const message = `Client ${clientPLayer.name} connected`;
      const action = {
        type: 'gameInfo',
        data: message
      };
      Logger.log(`Client ${clientPLayer.id} connected to room ${this.id}...`);
      this.host.socket.emit('action', action);
      if (this.isFull()) {
        Logger.log(`room ${this.id} ready`);
        this.newGame(null, true);
      }
    });
  }

  // TODO rewrite ( until ащк all will be called destroy )
  disconnectPlayer(client) {
    let idClient = (client.id).toString();
    if (this.host && idClient === this.host.id) {
      this.destroyRoom();
    }
    else if (this.client && idClient === this.client.id) {
      this.client = null;
      // this.stopGame();
      // TODO remove it
      this.destroyRoom();
    }
    else {
      throw new GameRoomException(`User not from room ${this.id}.`)
    }
  }

  destroyRoom() {
    this.stopGame();
    if (this.host) {
      this.host.socket.emit('roomDestroy', []);
      this.host.socket.emit('action', { type: 'roomDestroy', data: {} });
    }
    if (this.client) {
      this.client.socket.emit('roomDestroy', []);
      this.client.socket.emit('action', { type: 'roomDestroy', data: {} });
    }
    Logger.log(`room ${this.id} destroy`);
    // TODO Real destroy
  }

  isFull() {
    return this.host && this.client;
  }

  startGame() {

    const actionHost = {
      type: 'gameStart',
      data: this.getInfo(true)
    };

    const actionClient = {
      type: 'gameStart',
      data: this.getInfo(false)
    };

    this.host.socket.emit('action', actionHost);
    this.client.socket.emit('action', actionClient);

    Logger.log(`New Game in room ${this.id} started`);
  }

  newGame(client, root = false) {
    if (this.host && this.client) {
      if (root || this.host.id === (client.id).toString()) {
        this.game = new Game(this.host, this.client, this);
        this.startGame();
      }
      else {
        throw new GameRoomException(`You can't start new game in this room!`);
      }
    }
    else {
      throw new GameRoomException(`newGame create error, room not full`);
    }
  }

  stopGame() {
    this.game = null;
    if (this.host) {
      this.host.socket.emit('stopGame', []);
    }
    if (this.client) {
      this.client.socket.emit('stopGame', []);
    }
    Logger.log(`Game in room ${this.id} stop`);
  }

  move(row, cell, client) {
    if (!this.game) {
      throw new GameRoomException(`Game not started`);
    }
    this.game.move(row, cell, client);
  }

  upScore(playerId) {
    this.scores[playerId] = this.scores[playerId] ? this.scores[playerId] + 1 : 1;
  }

  say(client, message) {
    let idClient = (client.id).toString();
    let name = idClient.substr(0, 5);

    const serverTime = (new Date).toLocaleTimeString();

    if ((this.host && this.host.id === idClient) || (this.client && this.client.id === idClient)) {
      if (this.client) {
        const action = {
          type: 'newMessage',
          data: {
            date: serverTime,
            name: name,
            message: message
          }
        };
        this.client.socket.emit('action', action);
      }
      if (this.host) {
        const action = {
          type: 'newMessage',
          data: {
            date: serverTime,
            name: name,
            message: message
          }
        };
        this.host.socket.emit('action', action);
      }
    }
    else {
      throw new GameChatException(`You can't send message to the room`);
    }
  }

  getInfo(isHost = true) {
    return {
      id: this.id,
      link: this.link,
      host: this.host ? this.host.getInfo(isHost) : null,
      client: this.client ? this.client.getInfo(!isHost) : null,
      scores: this.scores
    };
  }
}

/**
 * Exceptions
 */
class GameRoomException {
  constructor(message) {
    this.message = message;
    this.name = "Game room Exception";
  }
}

class GameChatException {
  constructor(message) {
    this.message = message;
    this.name = "Game chat Exception";
  }
}

class FatalGameRoomException extends GameRoomException {
  constructor(message) {
    super(message, "Fatal game room Exception");
  }
}


module.exports = { GameRoom };
