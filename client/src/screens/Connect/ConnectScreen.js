import React from 'react';
import Screen from '../../layouts/SimpleScreen';
import { ConnectToRoomContainer } from '../../components/ConnectToRoom';

export class ConnectScreen extends React.Component {
  render() {
    return <Screen>
      <ConnectToRoomContainer/>
    </Screen>;
  }
}

export default ConnectScreen;
