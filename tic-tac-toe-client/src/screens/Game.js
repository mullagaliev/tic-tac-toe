import React from 'react';
import { Screen } from './Screen';
import { Icon } from 'semantic-ui-react';
import Players from '../components/Players/Players';
import GameField from '../components/Field/Field';

export default class Game extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Screen
      active={ this.props.active }
      nav={<div>
        <button className="b-top-nav__button left">
          <Icon name='arrow left' size="large" color="white"/>
        </button>
        <span className="c-level">
          <Icon name='trophy' size="large" color="white"/>
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
}

export { Game };
