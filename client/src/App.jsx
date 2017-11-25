import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';
import Alerter from './components/Alert/Alert';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import {
  connect,
  newGame,
  subscribeToRoomInit,
  subscribeToRoomReady,
  subscribeToRoomDestroy,
  subscribeToGameEnd
} from './api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

let SCREENS = {
  MENU: { screen: 1 },
  SETTINGS: { screen: 2 },
  GAME: { screen: 3 },
  WINNER: { screen: 4 }
};

class Empty extends React.Component {
  render() {
    return <div>
      <p>Hello! i am empty elem</p>
      {console.log(this.props.match.params.roomId)}
    </div>;
  }
}

class newApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentScreen: SCREENS.MENU,
      roomInfo: null,
      players: [],
      stopGame: false,
      winnerId: -1,
      isHost: false
    };
    subscribeToRoomInit((err, roomInfo) => {
      console.log(roomInfo);
      if (!err) {
        this.setState({ roomInfo: roomInfo });
      }
    });
    subscribeToRoomDestroy((err, room) => {
      console.log('DESTROY!!');
      console.log(room);
      if (!err) {
        this.setState({ players: [] });
      }
    });
    subscribeToRoomReady((err, roomInfo) => {
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
    subscribeToGameEnd((err, winnerId, isHost) => {
      this.setState({ currentScreen: SCREENS.WINNER, winnerId: winnerId, isHost: isHost });
    });
  }

  render() {
    return <Router basename="/">
      <div>
        <Alerter/>
        <Switch>
          <Route path='/menu' component={() => {
            return (<MenuScreen
                onConnect={(url)=>connect(url, ()=>{})}
                link={this.state.roomInfo ? this.state.roomInfo.link : null}/>);
          }
          }/>
          <Route path='/game/over' component={() => {
            return (<GameOverScreen
                roomId={this.state.roomInfo ? this.state.roomInfo.id : null}
                winnerName={ this.state.winnerId }
                onNewGame={newGame}
                isHost={ this.state.isHost }
            />);
          }}/>
          <Route path='/game' component={() => {
            return <GameScreen
                active={ true }
                roomInfo={this.state.roomInfo}
                roomId={this.state.roomInfo ? this.state.roomInfo.id : null}
                players={this.state.players}
                stop={this.state.stopGame}
            />;
          }
          }/>
          <Route path='/connect/:roomId' component={Empty}/>
          <Route path='/manual' component={Empty}/>
          <Route path='/' component={Empty}/>
        </Switch>
      </div>
    </Router>;
  }
}

export default newApp;
