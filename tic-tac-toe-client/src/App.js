import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.sass';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Players from './components/Players/Players';
import GameField from './components/Field/Field';
import Screen from './screens/Screen';

class Menu extends React.Component {
  render() {
    return <Screen content={
      <p>
        Hello world!
      </p>}
    />;
  }
}

function Game() {
  return <Screen
    nav={<div>
      <button className="b-top-nav__button left">
        <Icon name='arrow left' size="large" color="white"/>
      </button>
      <span className="c-level">
        <Icon name='star' size="large" color="white"/>
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
        <Players/>
      </div>
      <div className="b-game-interface__field">
        <div className="b-game-field">
          <GameField />
        </div>
      </div>
    </div>}
  />;
}

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
