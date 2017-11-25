import React from 'react';
import Screen from '../layouts/SimpleScreen';
import { Icon } from 'semantic-ui-react';
import Players from '../components/Players/Players';
import GameField from '../components/Field/Field';
import Chat from '../components/Chat/Chat';
import HelpInfo from '../modals/HelpInfo';
import { subscribeToUpdatePlayer, newGame } from '../api';
import TopGameMenu from '../layouts/headers/TopGameMenu';
import PLAYERS_ROLES from '../constants/playersRoles';

class GameScreen extends React.Component {
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

  getLevel() {
    // TODO added
    let level = 1;
    return level;
  }

  render() {
    return <Screen
        active={ this.props.active }
        header={ <TopGameMenu
            role={ this.iAmHost ? PLAYERS_ROLES.HOST : PLAYERS_ROLES.CLIENT }
            level={ this.getLevel() }
            onNewGame={() => newGame(this.props.roomId) }/>}
        footer={ <Chat roomId={this.props.roomId}/> }>
      <div className="b-game">
        <div className="b-game-interface__settings">
          <button className="left">
            <HelpInfo />
          </button>
          <button className="right">
            <Icon name='volume up' size="big" color="white"/>
          </button>
        </div>
        <div className="b-game-interface__info">
          <Players
              players={this.props.players}
              currentPlayerId={this.GetCurrentPlayerId()}
              currentPlayerMove={this.state.currentPlayerMove}
              isHost={this.iAmHost()}
              scores={this.props.roomInfo ? this.props.roomInfo.scores : {} }
          />
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameField
                roomId={this.props.roomId}
                enable={this.GetCurrentPlayerId() === this.state.currentPlayerMove}
                marker={this.GetCurrentMarker()}
            />
          </div>
        </div>
      </div>
    </Screen>;
  }
}

export default GameScreen;
