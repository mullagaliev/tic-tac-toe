import { connect } from 'react-redux';
import Players from '../../components/Players/Players';

const mapStateToProps = (state) => {
  return {
    players: state.players.list,
    currentPlayerMove: state.players.currentPlayer,
    isHost: state.player.isHost,
    currentPlayerId: state.player.id,
    scores: state.room.scores
  };
};

export const PlayersContainer = connect(mapStateToProps)(Players);
export default PlayersContainer;
