import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Player from './Player';
import Spinner from './Spinner';

const PlayersContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
`;

const PlayersList = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export class Players extends Component {
  render() {
    const { players, scores, isYour, currentPlayer, currentPlayerId, myMarker } = this.props;
    let playersList = players.map(player =>
        <Player
            key={player.id}
            player={player}
            marker={player.marker}
            name={player.name}
            active={player.id === currentPlayer}
            isYou={player.id === currentPlayerId}
            score={scores[player.id] ? scores[player.id] : 0}
        />);
    return (<PlayersContainer>
      <PlayersList>
        {playersList}
      </PlayersList>
      <Spinner isYour={isYour}
               myMarker={myMarker}/>
    </PlayersContainer>);
  }
}

Player.propTypes = {
  players: PropTypes.array,
  currentPlayerId: PropTypes.string,
  currentPlayer: PropTypes.string,
  isCurrent: PropTypes.bool,
  myMarker: PropTypes.string
};

Player.defaultProps = {
  players: [],
  currentPlayerId: null,
  currentPlayer: null,
  isCurrent: false,
  myMarker: '_'
};

export default Players;
