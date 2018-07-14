import React from 'react';
import PropTypes from 'prop-types';
import Screen from '../../layouts/SimpleScreen';
import { Button, Icon } from 'semantic-ui-react';
import Authors from '../../components/static/Authors/Authors';
import '../../components/Menu/MenuScreen.sass';

export class GameOverScreen extends React.Component {
  render() {
    return <Screen
      classBgName={'BgImage BgBlur'}
      children={
        <div className="b-menu">
          <h1 className="welcome">
            Player {this.props.winnerName} win!
            {}
          </h1>
          <div className="b-logo"/>
          <div className="b-menu__list">
            <div className="b-menu__item">
              {
                <Button
                  fluid primary animated='vertical'
                  onClick={() => {
                    this.props.onNewGame();
                  }}>
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
        </div>}
    />;
  }
}

GameOverScreen.propTypes = {
  winnerName: PropTypes.string,
  onNewGame: PropTypes.func,
  onExit: PropTypes.func
};
GameOverScreen.defaultProps = {
  winnerName: '',
  onNewGame: () => {
  },
  onExit: () => {
  }
};

export default GameOverScreen;

