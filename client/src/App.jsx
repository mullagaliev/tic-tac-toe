import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';
import Alerter from './components/Alert/Alert';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame, connectToRoom } from './actions';
import GAME_STATUSES from './constants/gameStatuses';


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
  }

  render() {
    const {
      roomInfo,
      players,
      gameStatus,
      winnerId
    } = this.props;
    const roomId = roomInfo ? roomInfo.id : null;
    return <Router basename="/">
      <div>
        <Alerter/>
        <Switch>
          <Route path='/menu' component={() => {
            if (players.length === 2) {
              return <Redirect to="/game"/>;
            }
            return <MenuScreen
                onConnect={(url) => {
                  const roomIdForConnect = url.split('/').slice(-1)[0];
                  const cb = () => {
                  };
                  this.props.dispatch(connectToRoom(roomIdForConnect, cb));
                }}
                link={roomInfo ? roomInfo.link : null}/>;
          }}/>
          <Route path='/game/over' component={() => {
            if (gameStatus === GAME_STATUSES.STARTED) {
              return <Redirect to='/game'/>;
            }
            return (<GameOverScreen
                roomId={roomId}
                winnerName={ winnerId }
                onNewGame={() => this.props.dispatch(newGame(roomId))}
                isHost={ true }
            />);
          }}/>
          <Route path='/game' component={() => {
            if (players.length !== 2) {
              return <Redirect to='/menu'/>;
            }
            if (gameStatus === GAME_STATUSES.FINISH) {
              return <Redirect to='/game/over'/>;
            }
            return <GameScreen
                active={ true }
                roomInfo={roomInfo}
                roomId={roomId}
                players={players}
                stop={this.state.stopGame}
            />;
          }
          }/>
          <Route path='/connect/:roomId' component={({ match }) => {
            const roomIdForConnect = match.params.roomId;
            this.props.dispatch(connectToRoom(roomIdForConnect, ()=>{}));
            return <Redirect to='/game'/>;
          }}/>
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
  if (state.room) {
    if (state.room.client) {
      players.push(state.room.client);
    }
    if (state.room.host) {
      players.push(state.room.host);
    }
  }
  return {
    gameStatus: state.gameStatus,
    roomInfo: state.room,
    players: players,
    winnerId: state.winnerId
  };
}

export default connect(mapStateToProps)(newApp);
