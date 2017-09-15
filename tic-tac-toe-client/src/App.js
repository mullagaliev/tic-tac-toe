import React, { Component } from 'react';
// import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';
// import { Icon } from 'semantic-ui-react';
import { Menu } from './screens/Menu';
import { Game } from './screens/Game';
import { Endgame } from './screens/Endgame';
import { Alerter } from './components/Alert/Alert';
import { subscribeToRoomInit, subscribeToRoomReady, subscribeToRoomDestroy, subscribeToGameEnd } from './api';

let SCREENS = {
  MENU: { screen: 1 },
  SETTINGS: { screen: 2 },
  GAME: { screen: 3 },
  WINNER: { screen: 4 }
};

class App extends Component {
  constructor() {
    super();
    this.state = { currentScreen: SCREENS.MENU,
      roomInfo: null,
      players: [],
      stopGame: false,
      winnerId: -1,
      isHost: false
    };
    subscribeToRoomInit((err, roomInfo)=>{
      console.log(roomInfo);
      if (!err) {
        this.setState({ roomInfo: roomInfo });
      }
    });
    subscribeToRoomDestroy((err, room)=>{
      console.log('DESTROY!!');
      console.log(room);
      if (!err) {
        // this.setState({ roomInfo: roomInfo });
      }
    });
    subscribeToRoomReady((err, roomInfo)=>{
      console.log('room ready');
      if (!err) {
        console.log(roomInfo);
        let players = [];
        if (roomInfo.host) {
          players.push(roomInfo.host);
        }
        if (roomInfo.client) {
          players.push(roomInfo.client);
        }
        this.setState({ currentScreen: SCREENS.GAME, roomInfo: roomInfo, players: players });
      }
    });
    subscribeToGameEnd((err, winnerId, isHost)=>{
      this.setState({ currentScreen: SCREENS.WINNER, winnerId: winnerId, isHost: isHost });
    });
  }
  render() {
    return (
      <div className="App">
        <Alerter />
        <Menu active={ this.state.currentScreen === SCREENS.MENU }
          link={this.state.roomInfo ? this.state.roomInfo.link : null}/>
        <Game active={ this.state.currentScreen === SCREENS.GAME }
          roomInfo={this.state.roomInfo}
          roomId={this.state.roomInfo ? this.state.roomInfo.id : null}
          players={this.state.players}
          stop={this.state.stopGame}
        />
        <Endgame active={ this.state.currentScreen === SCREENS.WINNER }
          roomId={this.state.roomInfo ? this.state.roomInfo.id : null}
          winnerId={ this.state.winnerId }
          isHost={ this.state.isHost }
        />
      </div>
    );
  }
}

export default App;
