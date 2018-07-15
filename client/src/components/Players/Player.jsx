import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './Players.sass';


class Player extends Component {
  render() {
    const { id, position, active, current, name, score, marker } = this.props;
    return (<div
        className={'b-player b-player--' + position + (active ? ' current' : '')}
        key={id}>
      <div className="b-player__name">
        <span>
          {current ? `You (${name})` : name}
          <br/>
        </span>
      </div>
      {/* TODO create score component */}
      <div className="b-player__score">
        {score}
      </div>
      <div className="b-player__avatar">
        <img
            src="/static/img/default_avatar.png"
            className="b-player__avatar-image"/>
        <div className="b-player__marker c-mark" value={marker}>
          <Icon className="c-mark__x" name='remove' size="big" color="pink"/>
          <Icon className="c-mark__o" name='circle thin' size="big" color="blue"/>
        </div>
      </div>
    </div>);
  }
}

Player.propTypes = {
  position: PropTypes.string,
  active: PropTypes.bool,
  current: PropTypes.bool,
  name: PropTypes.string,
  score: PropTypes.number,
  marker: PropTypes.string
};
Player.defaultProps = {
  position: 'client',
  active: false,
  current: false,
  name: 'Guest',
  score: 0,
  marker: '_'
};

export default Player;
