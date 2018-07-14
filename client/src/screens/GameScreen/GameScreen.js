import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import Players from '../../components/Players/Players';
import GameFieldContainer from '../../containers/Field/FieldContainer';
import ChatContainer from '../../containers/Chat/ChatContainer';
import TopGameMenu from '../../layouts/headers/TopGameMenu';
import PLAYERS_ROLES from '../../constants/playersRoles';
import { connect } from 'react-redux';
import { newGame } from '../../redux/actions/index';

// TODO переделать весь компонент, убрать connect
export class GameScreen extends React.Component {
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

  componentWillUnmount() {
    // this.props.dispatch({ type: 'disconnect', date: {} });
  }

  render() {
    const { currentPlayer } = this.props;
    return <Screen
        active={ this.props.active }
        classBgName={'BgImage'}
        header={ <TopGameMenu
            role={ this.iAmHost ? PLAYERS_ROLES.HOST : PLAYERS_ROLES.CLIENT }
            level={ this.getLevel() }
            onNewGame={() => this.props.dispatch(newGame(this.props.roomId))}/>}
        footer={ <ChatContainer roomId={this.props.roomId}/> }>
      <div className="b-game">
        <div className="b-game-interface__info">
          <Players
              players={this.props.players}
              currentPlayerId={this.GetCurrentPlayerId()}
              currentPlayerMove={currentPlayer}
              isHost={this.iAmHost()}
              scores={this.props.roomInfo ? this.props.roomInfo.scores : {} }
          />
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameFieldContainer
                roomId={this.props.roomId}
                enable={this.GetCurrentPlayerId() === currentPlayer}
                marker={this.GetCurrentMarker()}
            />
          </div>
        </div>
      </div>
    </Screen>;
  }
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.players.currentPlayer
  };
}

export const GameScreenContainer = connect(mapStateToProps)(GameScreen);
export default GameScreen;
