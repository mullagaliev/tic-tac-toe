const nanoid = require('nanoid');

const { MARKERS } = require('../constants/markers');
const { loggerInfo, getWinnerMarker, getEmptyField } = require('../helpers');
const { updateFieldAction, gameOverAction, switchCurrentPlayerAction } = require('../actions');


class Game {
  constructor(player1, player2, room = null, swapSides = true) {
    this.id = nanoid();
    this.field = getEmptyField(4);
    this.room = room;

    this._currentMovePlayer = null;
    this.player1 = player1;
    this.player2 = player2;
    // Смена сторон
    if (swapSides) {
      this.player1.swapMarkers(this.player2);
    }

    this.updateField();

    // игрок с маркером Х ходит первым
    if (this.player1.marker === MARKERS.X) {
      this.updateCurrentMovePlayer(player1);
    } else {
      this.updateCurrentMovePlayer(player2);
    }
    loggerInfo(`game (${this.id}) created for player ${player1} and player ${player2}`);
  }

  set currentMovePlayer(player) {
    this._currentMovePlayer = player;
    loggerInfo(`New current player ${player} in game ${this.id}`);

    const actionCurrent = switchCurrentPlayerAction({
      currentPlayer: player.id,
      isCurrent: true
    });

    const action = switchCurrentPlayerAction({
      currentPlayer: player.id,
      isCurrent: false
    });

    this.player1
        .socket
        .emit('action', player === this.player1 ? actionCurrent : action);
    this.player2
        .socket
        .emit('action', player === this.player2 ? actionCurrent : action);
  }

  get currentMovePlayer() {
    return this._currentMovePlayer;
  }

  getWinner() {
    const winnerMarker = getWinnerMarker(this.field);
    if (!Boolean(winnerMarker)) {
      return -1;
    }

    if (winnerMarker === this.player1.marker) {
      return this.player1.id;
    }
    if (winnerMarker === this.player2.marker) {
      return this.player2.id;
    }
    throw new FatalGameException(`Undefined marker in getWinner`);
  }

  /**
   * bool
   */
  moves() {
    return this.field.reduce((prev, row) => {
      return prev || row.reduce((prevCell, cell) => {
        return prevCell || (cell === MARKERS._);
      }, false);
    }, false);
  }

  /**
   * bool
   */
  isEnd() {
    //TODO add tie checker
    if (!this.moves()) {
      loggerInfo(`All busy`);
      return true;
    }
    try {
      return this.getWinner() !== -1;
    }
    catch (e) {
      loggerInfo(e.message);
    }
  }

  updateField() {
    const action = updateFieldAction(this.field);
    this.player1.socket.emit('action', action);
    this.player2.socket.emit('action', action);
  }

  move(row, cell, client) {
    if (this.isEnd()) {
      throw new GameException(`Game ended`);
    }
    if (this.currentMovePlayer.id !== client.id) {
      throw new GameException(`Not your turn`);
    }
    if (!this.field[row] || !this.field[row][cell]) {
      throw new GameException(`Not exists row/cell`);
    }
    if (this.field[row][cell] !== MARKERS._) {
      throw new GameException(`Cell is busy`);
    }
    if (!this.moves()) {
      throw new GameException(`don't exist any empty cell`);
    }
    this.field[row][cell] = this.currentMovePlayer.marker;
    this.updateField();
    loggerInfo(`player ${this.currentMovePlayer} marked (${this.currentMovePlayer.marker}) field[${row}][${row}]`);

    if (this.isEnd()) {
      const winnerId = this.getWinner();
      const action = gameOverAction({
        winnerId
      });
      this.player1
          .socket
          .emit('action', action);
      this.player2
          .socket
          .emit('action', action);
      if (winnerId !== -1 && this.room) {
        this.room.upScore(winnerId);
      }
    }
    else {
      this.updateCurrentMovePlayer();
    }
  }

  updateCurrentMovePlayer(player = null) {
    // auto change current player
    if (!Boolean(player)) {
      return this.currentMovePlayer = this.currentMovePlayer === this.player1 ? this.player2 : this.player1;
    }

    if (player !== this.player1 && player !== this.player2) {
      throw new FatalGameException(`Undefined player (${player})`);
    }

    return this.currentMovePlayer = player;
  }
}

/**
 * Exceptions
 */
class GameException {
  constructor(message) {
    this.message = message;
    this.name = "Game Exception";
  }
}

class FatalGameException extends GameException {
  constructor(message) {
    super(message, "Fatal game Exception");
  }
}

module.exports = { Game };
