import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';
import './Players.sass';
import Player from './Player';


class Players extends Component {
  currentPositionLoader() {
    let position = 1;
    // TODO edit this
    if ((this.props.isHost &&
            this.props.currentPlayerMove !== this.props.currentPlayerId) ||
        (!this.props.isHost &&
            this.props.currentPlayerMove === this.props.currentPlayerId)) {
      position = 2;
    }
    return position;
  }

  render() {
    const { players, scores } = this.props;
    let playersList = players.map((player) => {
      return <Player
          key={player.id}
          player={player}
          id={player.id}
          name={player.name}
          active={player.id === this.props.currentPlayerMove}
          current={player.current}
          marker={player.marker}
          position={player.isHost ? 'host' : 'client'}
          score={scores[player.id] ? scores[player.id] : 0}
      />;
    });
    return (<div className="b-players">
      <div className="b-players__list">
        {playersList}
      </div>
      <div className="b-players__current" data-value={this.currentPositionLoader()}>
        <Popup
            trigger={<div className="c-current">
              <Icon loading name='spinner' size="big" color="white"/>
            </div>}
            content={this.props.currentPlayerMove === this.props.currentPlayerId ? 'Ваш ход' : 'Игрок думает'}
            position='top center'
        />
      </div>
    </div>);
  }
}

Player.propTypes = {
  players: PropTypes.array,
  currentPlayerId: PropTypes.string,
  currentPlayerMove: PropTypes.string,
  isHost: PropTypes.bool
};
Player.defaultProps = {
  players: [],
  currentPlayerId: null,
  currentPlayerMove: null,
  isHost: null
};

export default Players;
