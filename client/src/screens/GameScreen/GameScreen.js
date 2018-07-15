import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import { PlayersContainer } from '../../containers/Players';
import GameFieldContainer from '../../containers/Field/FieldContainer';
import ChatContainer from '../../containers/Chat/ChatContainer';
import TopGameMenu from '../../layouts/headers/TopGameMenu';
import PLAYERS_ROLES from '../../constants/playersRoles';
import { connect } from 'react-redux';
import { newGame } from '../../redux/actions/index';

// TODO переделать весь компонент, убрать connect
export class GameScreen extends React.Component {
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
        classBgName={'BgImage'}
        header={<TopGameMenu
            role={this.iAmHost ? PLAYERS_ROLES.HOST : PLAYERS_ROLES.CLIENT}
            level={this.getLevel()}
            onNewGame={() => this.props.dispatch(newGame(this.props.roomId))}/>}
        footer={<ChatContainer roomId={this.props.roomId}/>}>
      <div className="b-game">
        <div className="b-game-interface__info">
          <PlayersContainer/>
        </div>
        <div className="b-game-interface__field">
          <div className="b-game-field">
            <GameFieldContainer/>
          </div>
        </div>
      </div>
    </Screen>;
  }
}

export const GameScreenContainer = connect(null)(GameScreen);
export default GameScreen;
