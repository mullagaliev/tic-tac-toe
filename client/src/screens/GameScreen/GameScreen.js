import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import {
  PlayersContainer,
  ChatContainer,
  TopMenuContainer,
  GameFieldContainer,
  MessageListContainer
} from '../../containers';

export class GameScreen extends React.Component {
  render() {
    return <Screen
        classBgName={'BgImage'}
        header={<TopMenuContainer/>}
        footer={<ChatContainer/>}>
      <div className="b-game">
        <div className="b-game-interface__info">
          <MessageListContainer/>
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

export default GameScreen;
