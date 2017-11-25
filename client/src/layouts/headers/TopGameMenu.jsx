import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import PLAYERS_ROLES from '../../constants/playersRoles';

class TopGameMenu extends Component {
  render() {
    const { role } = this.props;
    return (
        <div>
          <button className="b-top-nav__button left" onClick={this.props.onExit}>
            <Icon name='arrow left' size="large" color="white"/>
          </button>
          <span className="c-level">
          <Icon name='trophy' size="large" color="white"/>
          <span className="c-level__title">Level {this.props.level}</span>
        </span>
          {
            role === PLAYERS_ROLES.HOST ? <button className="b-top-nav__button right" onClick={this.props.onNewGame}>
              <Icon name='refresh' size="large" color="white"/>
            </button> : null
          }
        </div>
    );
  }
}

TopGameMenu.propTypes = {
  level: PropTypes.number,
  onNewGame: PropTypes.func,
  onExit: PropTypes.func
};
TopGameMenu.defaultProps = {
  role: PLAYERS_ROLES.CLIENT,
  level: 0,
  onNewGame: () => {
    alert('new game');
  },
  onExit: () => {
    alert('exit');
  }
};

export default TopGameMenu;
