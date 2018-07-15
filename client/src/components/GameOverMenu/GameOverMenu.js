import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Authors from '../../components/static/Authors/Authors';
// import '../../components/Menu/MenuScreen.sass';

export class GameOverMenu extends Component {
  render() {
    const { winnerName, onNewGame } = this.props;
    return (
        <div className="b-menu">
          <h1 className="welcome">
            Player {winnerName} win!
          </h1>
          <div className="b-logo"/>
          <div className="b-menu__list">
            <div className="b-menu__item">
              {
                <Button
                    fluid primary animated='vertical'
                    onClick={onNewGame}>
                  <Button.Content visible>
                    New Game
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='rocket'/>
                  </Button.Content>
                </Button>
              }
            </div>
          </div>
          <Authors/>
        </div>
    );
  }
}

GameOverMenu.propTypes = {
  winnerName: PropTypes.string,
  onNewGame: PropTypes.func,
  onExit: PropTypes.func
};

GameOverMenu.defaultProps = {
  winnerName: '',
  onNewGame: () => {
  },
  onExit: () => {
  }
};

export default GameOverMenu;
