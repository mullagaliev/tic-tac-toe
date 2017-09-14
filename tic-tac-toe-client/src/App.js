import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import 'semantic-ui-css/semantic.min.css';

import { Menu } from './screens/Menu';
import { Game } from './screens/Game';

let SCREENS = {
  MENU: { screen: 1 },
  SETTINGS: { screen: 2 },
  GAME: { screen: 3 }
};

class App extends Component {
  constructor() {
    super();
    this.state = { currentScreen: SCREENS.MENU };
  }
  render() {
    return (
      <div className="App">
        <Menu active={true}/>
        <Game />
      </div>
    );
  }
}

export default App;
