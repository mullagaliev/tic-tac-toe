const { Player } = require('./Player');
const { Game } = require('./Game');
const {
  roomInitAction,
  roomDestroyAction,
  gameStartAction,
  gameStopAction
} = require('../actions/roomActions');
const { gameInfoAction } = require('../actions/otherActions');
const { newMessageAction } = require('../actions/chatActions');
const { MARKERS } = require('../constants/markers');
const { loggerInfo } = require('../helpers/logger');


class GameRoom {
  constructor(host) {
    const idHost = host.id;
    const hostPlayer = new Player(host);
    this.id = `room-${idHost}`;
    this.link = `http://localhost:3000/connect/${this.id}`;
    if (host.handshake && host.handshake.headers && host.handshake.headers.origin) {
      this.link = `${host.handshake.headers.origin}/connect/${this.id}`;
    }
    this.host = hostPlayer;
    this.client = null;
    this.game = null;
    this.level = 1;

    // TODO add members
    this.players = [];
    this.players
        .push(hostPlayer);

    host.join(this.id, () => host.emit('action', roomInitAction(this.getInfo())));
    loggerInfo(`room (${this.id}) created for player ${idHost}`);
  }

  connectPlayer(client) {
    let clientPLayer = new Player(client, MARKERS.O, false);
    if (this.host.id === clientPLayer.id) {
      throw new GameRoomException(`You Can't connect to yourself`);
    }
    if (this.isFull()) {
      throw new GameRoomException(`You Can't connect to full room`);
    }
    if (this.host.marker === clientPLayer.marker) {
      throw new FatalGameRoomException(`You Can't use equal markers`);
    }

    this.client = clientPLayer;
    client.join(this.id, () => {
      const message = `Client ${clientPLayer.name} connected`;
      this.host
          .socket
          .emit('action', gameInfoAction(message));

      loggerInfo(`Client ${clientPLayer.id} connected to room ${this.id}...`);
      if (this.isFull()) {
        loggerInfo(`room ${this.id} ready`);
        this.newGame(null, true);
      }
    });
  }

  // TODO rewrite
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

  // TODO add Real destroy
  destroyRoom() {
    this.stopGame();
    if (this.host) {
      this.host.socket.emit('action', roomDestroyAction());
    }
    if (this.client) {
      this.client.socket.emit('action', roomDestroyAction());
    }
    loggerInfo(`room ${this.id} destroy`);
  }

  isFull() {
    return this.host && this.client;
  }

  startGame() {
    this.host
        .socket
        .emit('action', gameStartAction(this.getInfo(true)));
    this.client
        .socket
        .emit('action', gameStartAction(this.getInfo(false)));
    loggerInfo(`New Game in room ${this.id} started`);
  }

  newGame(client, root = false) {
    if (!this.isFull()) {
      throw new GameRoomException(`You can't start new game. Room is not full. `);
    }
    // TODO переделать
    if (root || this.host.id === (client.id).toString()) {
      this.game = new Game(this.host, this.client, this);
      this.startGame();
    }
    else {
      throw new GameRoomException(`You can't start new game in this room!`);
    }
  }

  stopGame() {
    this.game = null;
    if (this.host) {
      this.host
          .socket
          .emit('stopGame', gameStopAction());
    }
    if (this.client) {
      this.client
          .socket
          .emit('stopGame', gameStopAction());
    }
    loggerInfo(`Game in room ${this.id} stop`);
  }

  move(row, cell, client) {
    if (!this.game) {
      throw new GameRoomException(`Game not started`);
    }
    this.game
        .move(row, cell, client);
  }

  upScore(playerId) {
    this.level++;
    if (playerId === this.client.id) {
      return this.client.upScore();
    }
    if (playerId === this.host.id) {
      return this.host.upScore();
    }
  }

  say(client, message) {
    if (!this.isFull()) {
      throw new GameChatException(`You can't send message to the room`);
    }

    const playerId = (client.id).toString();

    const myMessageAction = newMessageAction({
      isYour: true,
      playerId,
      message
    });
    const messageAction = newMessageAction({
      isYour: false,
      playerId,
      message
    });

    this.client
        .socket
        .emit('action', client === this.client.socket ?
            myMessageAction : messageAction);
    this.host
        .socket
        .emit('action', client === this.host.socket ?
            myMessageAction : messageAction);
  }

  getInfo(isHost = true) {
    return {
      id: this.id,
      link: this.link,
      host: this.host && this.host.getInfo(isHost),
      client: this.client && this.client.getInfo(!isHost),
      level: this.level
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
