import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './Players.sass';


class Player extends Component {
  render() {
    return (<div
      className={'b-player b-player--' + this.props.position + (this.props.active ? ' current' : '') }
      key={this.props.id}>
      <div className="b-player__name">
        <span>
          { this.props.current ? 'You (' + this.props.name + ')' : this.props.name }
          <br/>
        </span>
      </div>
      {/* TODO create score component */}
      <div className="b-player__score">
        {this.props.score}
      </div>
      <div className="b-player__avatar">
        <img
          // TODO move to static folder
          src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-128.png"
          className="b-player__avatar-image"/>
        <div className="b-player__marker c-mark" value={ this.props.marker }>
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
