const { MARKERS } = require('./Marker');
const { Logger } = require('./Logger');
const nanoid = require('nanoid');


class Game {
  constructor(player1, player2, room = null, swapSides = true) {
    this.id = nanoid();
    let defaultField = [
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._]
    ];
    this.field = defaultField;
    this.room = room;

    this.currentMovePlayer = null;
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
    Logger.log(`game (${this.id}) created for player ${player1} and player ${player2}`);
  }

  getWinner() {
    if (!this.field) {
      return -1;
    }

    function getHorizontalWinnerMarker(field) {
      const rows = field.filter((row) => {
        return row[0] === row[1]
            && row[1] === row[2]
            && row[2] === row[3];
      });
      return rows[0] ? rows[0][0] : MARKERS._;
    }

    function getVerticalWinnerMarker(field) {
      // shit
      for (let keyCol = 0; keyCol < field.length; keyCol++) {
        if (field[0][keyCol] === field[1][keyCol]
            && field[1][keyCol] === field[2][keyCol]
            && field[2][keyCol] === field[3][keyCol]
            && field[0][keyCol] !== MARKERS._) {
          return field[0][keyCol];
        }
      }
      return MARKERS._;
    }

    function getDiagonalWinnerMarker(field) {
      if (field[0][0] === field[1][1]
          && field[1][1] === field[2][2]
          && field[2][2] === field[3][3]
          && field[0][0] !== MARKERS._) {
        return field[0][0];
      }
      if (field[0][3] === field[1][2]
          && field[1][2] === field[2][1]
          && field[2][1] === field[3][0]
          && field[0][3] !== MARKERS._) {
        return field[0][3];
      }
      return MARKERS._;
    }

    const horizontalWinnerMarker = getHorizontalWinnerMarker(this.field);
    const verticalWinnerMarker = getVerticalWinnerMarker(this.field);
    const diagonalWinnerMarker = getDiagonalWinnerMarker(this.field);

    let winnerMarker = MARKERS._;
    if (horizontalWinnerMarker !== MARKERS._) {
      winnerMarker = horizontalWinnerMarker;
    }
    else if (verticalWinnerMarker !== MARKERS._) {
      winnerMarker = verticalWinnerMarker;
    }
    else if (diagonalWinnerMarker !== MARKERS._) {
      winnerMarker = diagonalWinnerMarker;
    }
    else {
      winnerMarker = MARKERS._;
    }
    let playerIdX = this.player1.marker === MARKERS.X ? this.player1.id : this.player2.id;
    let playerIdO = this.player1.marker === MARKERS.O ? this.player1.id : this.player2.id;

    Logger.log(`Current game field status h - ${horizontalWinnerMarker} v - ${verticalWinnerMarker} d - ${diagonalWinnerMarker}`);

    if (winnerMarker !== MARKERS._) {
      Logger.log(`winner marker - ${winnerMarker}`);
      if (winnerMarker === MARKERS.X) {
        Logger.log(`winner PlayerID - ${playerIdX}`);
        return playerIdX;
      }
      else if (winnerMarker === MARKERS.O) {
        Logger.log(`winner PlayerID - ${playerIdO}`);
        return playerIdO;
      }
      else {
        throw new FatalGameException(`Undefined marker`);
      }
    }
    return -1;
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
      Logger.log(`All busy`);
      return true;
    }
    try {
      return this.getWinner() !== -1;
    }
    catch (e) {
      Logger.log(e.message);
    }
  }

  updateField() {
    const action = {
      type: 'updateField',
      data: {
        field: this.field
      }
    };
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
    Logger.log(`player ${this.currentMovePlayer} marked (${this.currentMovePlayer.marker}) field[${row}][${row}]`);

    if (this.isEnd()) {
      const winnerId = this.getWinner();
      const action = {
        type: 'gameOver',
        data: {
          winnerId
        }
      };
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
    if (player) {
      if (player !== this.player1 && player !== this.player2) {
        throw new FatalGameException(`Undefined player (${player})`);
      }
      this.currentMovePlayer = player;
    }
    else {
      this.currentMovePlayer = this.currentMovePlayer === this.player1 ? this.player2 : this.player1;
    }
    Logger.log(`New current player ${this.currentMovePlayer} in game ${this.id}`);

    const actionCurrent = {
      type: 'switchCurrentPlayer',
      data: {
        currentPlayer: this.currentMovePlayer.id,
        isCurrent: true
      }
    };

    const action = {
      type: 'switchCurrentPlayer',
      data: {
        currentPlayer: this.currentMovePlayer.id,
        isCurrent: false
      }
    };

    if (this.currentMovePlayer === this.player1) {
      this.player1.socket.emit('action', actionCurrent);
      this.player2.socket.emit('action', action);
    }
    else {
      this.player1.socket.emit('action', action);
      this.player2.socket.emit('action', actionCurrent);
    }

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
