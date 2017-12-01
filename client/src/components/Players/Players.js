import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Players.sass';
import Player from './Player';


class Players extends Component {
  currentPositionLoader() {
    let position = 1;
    if ((this.props.isHost && this.props.currentPlayerMove !== this.props.currentPlayerId) ||
        (!this.props.isHost && this.props.currentPlayerMove === this.props.currentPlayerId)) {
      position = 2;
    }
    return position;
  }

  render() {
    const { players, scores } = this.props;
    let playersList = players.map((player) => {
      return <Player
          key={ player.id }
          id={ player.id }
          name={ player.name }
          active={ player.id === this.props.currentPlayerMove }
          current={ player.current }
          marker={ player.marker }
          position={ player.isHost ? 'host' : 'client' }
          score={ scores[player.id] ? scores[player.id] : 0}
      />;
    });
    return (<div className="b-players">
      <div className="b-players__list">
        {playersList}
      </div>
      <div className="b-players__current" value={ this.currentPositionLoader() }>
        <Popup
            trigger={<div className="c-current">
              <Icon loading name='spinner' size="big" color="white"/>
            </div>}
            content={ this.props.currentPlayerMove === this.props.currentPlayerId ? 'Ваш ход' : 'Игрок думает' }
            position='top center'
        />
      </div>
    </div>);
  }
}

Player.propTypes = {
  players: PropTypes.array,
  currentPlayerId: PropTypes.string,
  currentPlayerMove: PropTypes.bool,
  isHost: PropTypes.bool
};
Player.defaultProps = {
  players: [],
  currentPlayerId: null,
  currentPlayerMove: null,
  isHost: null
};

function mapStateToProps(state) {
  const players = [];
  if (state.room.client) {
    players.push(state.room.client);
  }
  if (state.room.host) {
    players.push(state.room.host);
  }
  return {
    players: players
  };
}

export default connect(mapStateToProps)(Players);
