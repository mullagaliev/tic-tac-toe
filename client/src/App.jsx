import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';

import { AlerterContainer } from './components/Alert/Alert';
import {
  MenuScreen,
  GameOverScreen,
  GameScreen,
  Error404Screen
} from './screens';

import { newGame, connectToRoom } from './redux/actions';
import GAME_STATUSES from './constants/gameStatuses';
import Background from './components/ui/Background';

class App extends Component {
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
        <Background/>
        <AlerterContainer/>
        <Switch>
          <Route path='/menu' component={() => {
            return gameStatus === GAME_STATUSES.STARTED ?
                <Redirect to="/game"/>
                :
                <MenuScreen/>;
          }}/>
          <Route path='/game/over' component={() => {
            return gameStatus !== GAME_STATUSES.FINISH ?
                <Redirect to='/game'/> : <GameOverScreen
                    roomId={roomId}
                    winnerName={winnerId}
                    onNewGame={() => this.props.dispatch(newGame(roomId))}
                    isHost={true}
                />;
          }}/>
          <Route path='/game' component={() => {
            if (players.length !== 2) {
              return <Redirect to='/menu'/>;
            }
            if (gameStatus === GAME_STATUSES.FINISH) {
              return <Redirect to='/game/over'/>;
            }
            return <GameScreen/>;
          }
          }/>
          <Route path='/connect/:roomId' component={({ match }) => {
            const roomIdForConnect = match.params.roomId;
            this.props.dispatch(connectToRoom(roomIdForConnect, () => {
            }));
            return <Redirect to='/game'/>;
          }}/>
          <Route path='/manual' component={Error404Screen}/>
          <Route path='/' component={() => {
            return <Redirect to='/menu'/>;
          }
          }/>
        </Switch>
      </div>
    </Router>;
  }
}

function mapStateToProps(state) {
  return {
    gameStatus: state.gameStatus,
    roomInfo: state.room,
    players: state.players.list,
    winnerId: state.players.winnerId
  };
}

export default connect(mapStateToProps)(App);
