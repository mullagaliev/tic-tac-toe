import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import { GameOverContainer } from '../../containers';

export class GameOverScreen extends React.Component {
  render() {
    return <Screen>
      <GameOverContainer/>
    </Screen>;
  }
}

export default GameOverScreen;
