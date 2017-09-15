import React from 'react';
import { Screen } from './Screen';
import { Icon } from 'semantic-ui-react';
import Players from '../components/Players/Players';
import GameField from '../components/Field/Field';
import { subscribeToUpdatePlayer, newGame } from '../api';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = { currentPlayerMove: null };
    subscribeToUpdatePlayer((err, current) => {
      console.log(current);
      if (!err) {
        this.setState({ currentPlayerMove: current });
      }
    });
  }
  GetCurrentMarker() {
    let roomInfo = this.props.roomInfo;
    let marker = '-';
    if (roomInfo && roomInfo.host && roomInfo.client) {
      marker = roomInfo.host.current ? roomInfo.host.marker : roomInfo.client.marker;
    }
    return marker;
  }
  GetCurrentPlayerId() {
    let roomInfo = this.props.roomInfo;
    let playerId = null;
    if (roomInfo && roomInfo.host && roomInfo.client) {
      playerId = roomInfo.host.current ? roomInfo.host.id : roomInfo.client.id;
    }
    return playerId;
  }
  iAmHost() {
    let roomInfo = this.props.roomInfo;
    let result = false;
    if (roomInfo && roomInfo.host) {
      result = this.GetCurrentPlayerId() === roomInfo.host.id;
    }
    return result;
  }
  render() {
    return <Screen
      active={ this.props.active }
      nav={<div>
        <button className="b-top-nav__button left" onClick={()=>newGame(this.props.roomId)}>
          <Icon name='arrow left' size="large" color="white"/>
        </button>
        <span className="c-level">
          <Icon name='trophy' size="large" color="white"/>
          <span className="c-level__title">Level 4</span>
        </span>
        <button className="b-top-nav__button right">
          <Icon className={'b-top-nav__button '} name='repeat' size="large" color="white"/>
        </button>
      </div>}
      content={<div className="b-game">
        <div className="b-game-interface__settings">
          <button className="left">
            <Icon name='question circle outline' size="big" color="white"/>
          </button>
          <button className="right">
            <Icon name='volume up' size="big" color="white"/>
          </button>
        </div>
        <div className="b-game-interface__info">
          <Players players={this.props.players}
            currentPlayerId={this.GetCurrentPlayerId()}
            currentPlayerMove={this.state.currentPlayerMove}
            isHost={this.iAmHost()}
            scores={this.props.roomInfo ? this.props.roomInfo.scores : {} }
          />
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameField roomId={this.props.roomId}
              marker={this.GetCurrentMarker()}
            />
          </div>
        </div>
      </div>}
    />;
  }
}

export { Game };
