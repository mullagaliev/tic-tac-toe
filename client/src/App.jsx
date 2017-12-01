import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';
import Alerter from './components/Alert/Alert';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import {
  subscribeToGameEnd
} from './services/game/api';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame } from './actions';

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
    subscribeToGameEnd((err, winnerId, isHost) => {
      this.setState({ currentScreen: SCREENS.WINNER, winnerId: winnerId, isHost: isHost });
    });
  }

  render() {
    const { roomInfo, players } = this.props;
    const roomId = roomInfo ? roomInfo.id : null;
    return <Router basename="/">
      <div>
        <Alerter/>
        <Switch>
          <Route path='/menu' component={() => {
            return ((players.length !== 2) ?
                <MenuScreen
                    onConnect={(url) => {
                      const roomIdForConnect = url.split('/').slice(-1)[0];
                      console.log(roomIdForConnect);
                      const cb = () => {
                      };
                      this.props.dispatch({ type: 'connectToRoom', data: { roomId: roomIdForConnect, cb } });
                    }}
                    link={roomInfo ? roomInfo.link : null}/>
                :
                <Redirect to="/game"/>);
          }}/>
          <Route path='/game/over' component={() => {
            return (<GameOverScreen
                roomId={roomInfo ? roomInfo.id : null}
                winnerName={ this.state.winnerId }
                onNewGame={newGame(roomId)}
                isHost={ this.state.isHost }
            />);
          }}/>
          <Route path='/game' component={() => {
            return (players.length === 2) ?
                <GameScreen
                    active={ true }
                    roomInfo={roomInfo}
                    roomId={roomId}
                    players={players}
                    stop={this.state.stopGame}
                /> : <Redirect to='/menu'/>;
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

newApp.defaultProps = {
  roomInfo: null
};

function mapStateToProps(state) {
  const players = [];
  if (state.room.client) {
    players.push(state.room.client);
  }
  if (state.room.host) {
    players.push(state.room.host);
  }
  return {
    roomInfo: state.room,
    players: players
  };
}

export default connect(mapStateToProps)(newApp);
