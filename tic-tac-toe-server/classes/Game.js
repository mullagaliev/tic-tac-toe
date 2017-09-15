let { MARKERS } = require('./Marker');
let { Logger } = require('./Logger');

class Game{
  constructor(player1, player2) {
    let defaultField = [
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._]
    ];
    this.id = 111; // TODO add unic id
    this.currentMovePlayer = null;
    this.player1 = player1;
    this.player2 = player2;
    this.field = defaultField;

    this.updateCurrentMovePlayer(player1);
    Logger.log(`game (${this.id}) created for player ${player1} and player ${player2}`);
  }
  move(row, cell, client){
    if(this.currentMovePlayer.id !== client.id){
      throw new GameException(`Not your turn`);
    }
    if(!this.field[row] || !this.field[row][cell]){
      throw new GameException(`Not exists row/cell`);
    }
    if( this.field[row][cell] !== MARKERS._ ){
      throw new GameException(`Cell is busy`);
    }

    this.field[row][cell] = this.currentMovePlayer.marker;
    this.player1.socket.emit('updateField', this.field);
    this.player2.socket.emit('updateField', this.field);
    Logger.log(`player ${this.currentMovePlayer} marked (${this.currentMovePlayer.marker}) field[${row}][${row}]`);

    this.updateCurrentMovePlayer();
  }
  updateCurrentMovePlayer(player = null){
    if(player){
      if(player !== this.player1 && player !== this.player2 ){
        throw new FatalGameException(`Undefined player (${player})`);
      }
      this.currentMovePlayer = player;
    }
    else{
      this.currentMovePlayer = this.currentMovePlayer === this.player1 ? this.player2 : this.player1;
    }
    Logger.log(`New current player ${this.currentMovePlayer} in game ${this.id}`);

    this.player1.socket.emit('switchCurrentPlayer', this.currentMovePlayer.id);
    this.player2.socket.emit('switchCurrentPlayer', this.currentMovePlayer.id);
  }
}

/**
 * Exceptions
 */
class GameException{
  constructor(message) {
    this.message = message;
    this.name = "Game Exception";
  }
}

class FatalGameException extends GameException{
  constructor(message) {
    super(message, "Fatal game Exception");
  }
}

module.exports = { Game };
