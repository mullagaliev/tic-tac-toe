import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import 'semantic-ui-css/semantic.min.css';

import { Menu } from './screens/Menu';
import { Game } from './screens/Game';


let SCREENS = {
  MENU: {},
  SETTINGS: {},
  GAME: {}
};
class App extends Component {
  constructor() {
    super();
    this.state = { currentScreen: SCREENS.MENU };
  }
  render() {
    return (
      <div className="App">
        <Game/>
        <Menu className="active"/>
      </div>
    );
  }
}

export default App;
