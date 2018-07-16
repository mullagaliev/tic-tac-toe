import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { HelpInfo } from '../../components/modals';
import LevelCounter from '../../components/common/Level/Level';
import './TopGameMenu.sass';

import PLAYERS_ROLES from '../../constants/playersRoles';


class TopGameMenu extends Component {
  render() {
    const { role } = this.props;
    const { onExit, onNewGame } = this.props;
    return (
        <div className={'GameMenu'}>
          <div className={'GameMenuMain'}>
            <button className="left" onClick={onExit}>
              <Icon name='arrow left' size="large" color="white"/>
            </button>
            <LevelCounter level={this.props.level} className={'alignAbsMiddle'}/>
            <button className="right" onClick={onNewGame} disabled={role !== PLAYERS_ROLES.HOST}>
              <Icon name='refresh' size="large" color="white"/>
            </button>
          </div>
          <div className={'GameMenuAdditional'}>
            <button className="left">
              <HelpInfo/>
            </button>
            <button className="right">
              <Icon name='volume up' size="big" color="white"/>
            </button>
          </div>
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
