import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
// TODO переписать на styled-components
import './Players.sass';

const PlayerStyled = styled.div`
  .b-player{
    &__avatar{
      position: relative;
      border-radius: 100%;
      width: 90px;
      height: 90px;
      background-color: ${({ marker }) => marker === 'x' ? '#EC607D' : '#57B2DF'};
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      &-image{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 70px;
        height: 70px;
        border-radius: 100%;
      }
    }
  }
`;

export class Player extends Component {
  render() {
    const { active, name, score, marker, isYou } = this.props;
    return (<PlayerStyled marker={marker}
        className={'b-player b-player--' + (isYou ? 'first' : 'second') + (active ? ' current' : '')}>
      <div className="b-player__name">
        <span>
          {isYou ? `You (${name})` : name}
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
    </PlayerStyled>);
  }
}

Player.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  score: PropTypes.number,
  marker: PropTypes.string
};
Player.defaultProps = {
  active: false,
  name: 'Guest',
  score: 0,
  marker: '_'
};

export default Player;
