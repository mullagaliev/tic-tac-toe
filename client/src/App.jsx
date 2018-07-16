import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.sass';
import { AlerterContainer } from './components/Alert';
import { PageShellHoC } from './HoC';
import {
  MenuScreen,
  GameOverScreen,
  GameScreen,
  Error404Screen,
  ConnectScreen
} from './screens';
import { Background } from './components/ui';

export class App extends Component {
  render() {
    return <Router basename="/">
      <div>
        <Background/>
        <AlerterContainer/>
        <Switch>
          <Route path='/menu' component={PageShellHoC(MenuScreen)}/>
          <Route path='/game/over' component={PageShellHoC(GameOverScreen)}/>
          <Route path='/game' component={PageShellHoC(GameScreen)}/>
          <Route path='/connect/:roomId' component={PageShellHoC(ConnectScreen)}/>
          <Route path='/manual' component={PageShellHoC(Error404Screen)}/>
          <Route path='/' component={PageShellHoC(Error404Screen)}/>
        </Switch>
      </div>
    </Router>;
  }
}

export default App;
