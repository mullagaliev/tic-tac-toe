let { Logger } = require('./Logger');
let { Player } = require('./Player');
let { MARKERS } = require('./Marker');



class Game{
  constructor(player1, player2) {
    let defaultField = [
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._],
      [MARKERS._, MARKERS._, MARKERS._, MARKERS._]
    ];
    this.id = 111;
    this.currentMovePlayer = null;
    this.player1 = player1;
    this.player2 = player2;
    this.field = defaultField;

    this.updateCurrentMovePlayer(player1);
    Logger.log(`game (${this.id}) created for player ${player1} and player ${player2}`);
  }
  move(row, cell, client){
    if(this.currentMovePlayer.id !== client.id){
      throw new GameRoomException(`Not your turn`);
    }
    if(!this.field[row] || !this.field[row][cell]){
      throw new GameRoomException(`Not exists row/cell`);
    }
    if( this.field[row][cell] !== MARKERS._ ){
      throw new GameRoomException(`Cell is busy`);
    }

    this.field[row][cell] = this.currentMovePlayer.marker;
    this.player1.socket.emit('updateField', this.field);
    this.player2.socket.emit('updateField', this.field);
    Logger.log(`player ${this.currentMovePlayer} marked (${this.currentMovePlayer.marker}) field[${row}][${row}]`);

    this.updateCurrentMovePlayer();
  }
  updateCurrentMovePlayer(player = null){
    if(player){
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

class GameRoom{
  constructor(host) {
    let idHost = (host.id).toString();
    let hostPLayer = new Player(host);
    this.id = `room-${idHost}`;
    this.link = 'http://localhost:3000/connect/'+this.id;
    this.host = hostPLayer;
    this.client = null;
    this.game = null;

    host.join(this.id, () => {
      host.emit('roomInit', this.getInfo());
    });
    Logger.log(`room (${this.id}) created for player ${idHost}`);
  }
  connectPlayer(client){
    let clientPLayer = new Player(client, MARKERS.O);
    if(this.host.id === clientPLayer.id){
      throw new GameRoomException(`Can't connect to yourself`);
    }
    // Connect to Full Room
    if(this.isFull()){
      throw new GameRoomException(`Can't connect to full room`);
    }
    if(this.host.marker === clientPLayer.marker){
      throw new FatalGameRoomException(`Can't use equal markers`);
    }
    this.client = clientPLayer;
    client.join(this.id, () => {
      Logger.log(`Client ${clientPLayer.id} connected to room ${this.id}...`);
      this.host.socket.emit('gameInfo', `Client ${clientPLayer.name} connected`);
      if(this.isFull()){
        Logger.log(`room ${this.id} ready`);
        this.startGame();
      }
    });
  }
  disconnectPlayer(client){
    
  }
  isFull(){
    return this.host && this.client;
  }
  startGame(){
    this.host.socket.emit('roomReady', this.getInfo(true));
    this.client.socket.emit('roomReady', this.getInfo(false));
    this.game = new Game(this.host, this.client);

    this.host.socket.emit('gameInfo', `Game started`);
    this.client.socket.emit('gameInfo', `Game started`);
  }
  move(row, cell, client){
    if(!this.game){
      throw new GameRoomException(`Game not started`);
    }
    this.game.move(row, cell, client);
  }
  getInfo(isHost = true){
    let info = {
      id: this.id,
      link: this.link,
      host: this.host ? this.host.getInfo(isHost) : null,
      client: this.client ? this.client.getInfo(!isHost) : null
    };
    return info;
  }
}

/**
 * Exceptions
 */
class GameRoomException{
  constructor(message) {
    this.message = message;
    this.name = "Game room Exception";
  }
}

class FatalGameRoomException extends GameRoomException{
  constructor(message) {
    super(message, "Fatal game room Exception");
  }
}


module.exports = { GameRoom };
