import { connect } from 'react-redux';
import { Players } from '../../components/Players';

const mapStateToProps = (state) => {
  return {
    players: state.players.list,
    currentPlayer: state.players.currentPlayer,
    currentPlayerId: state.player.id,
    scores: state.room.scores,
    isYour: state.players.isCurrent,
    myMarker: state.player.marker
  };
};

export const PlayersContainer = connect(mapStateToProps)(Players);
export default PlayersContainer;
