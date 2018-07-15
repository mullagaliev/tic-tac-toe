import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import { PlayersContainer } from '../../containers/Players';
import GameFieldContainer from '../../containers/Field/FieldContainer';
import { ChatContainer } from '../../containers/Chat';
import { TopMenuContainer } from '../../containers/TopMenu';


export class GameScreen extends React.Component {
  render() {
    return <Screen
        classBgName={'BgImage'}
        header={<TopMenuContainer/>}
        footer={<ChatContainer/>}>
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

export default GameScreen;
