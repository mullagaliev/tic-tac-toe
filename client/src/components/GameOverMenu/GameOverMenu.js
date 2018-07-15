import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Authors from '../../components/static/Authors/Authors';

// import '../../components/Menu/MenuScreen.sass';

export class GameOverMenu extends Component {
  render() {
    const { onNewGame, youWin, isHost } = this.props;
    return (
        <div className="b-menu">

          <h1 className="welcome">
            {youWin ? 'You win!' : 'You lose!'}
            <br/>
            {youWin ? '🤩' : '😢'}
          </h1>
          <div className="b-logo"/>
          <div className="b-menu__list">
            <div className="b-menu__item">
              {
                isHost ?
                    <Button
                        fluid primary animated='vertical'
                        disabled={!isHost}
                        onClick={onNewGame}>
                      <Button.Content visible>
                        New Game
                      </Button.Content>
                      <Button.Content hidden>
                        <Icon name='rocket'/>
                      </Button.Content>
                    </Button>
                    :
                    <div>
                      <Icon loading name='spinner' size="big" color="white"/>
                    </div>
              }
            </div>
          </div>
          <Authors/>
        </div>
    );
  }
}

GameOverMenu.propTypes = {
  onNewGame: PropTypes.func,
  onExit: PropTypes.func
};

GameOverMenu.defaultProps = {
  onNewGame: () => {
  },
  onExit: () => {
  }
};

export default GameOverMenu;
