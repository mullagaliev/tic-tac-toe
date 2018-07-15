import { connect } from 'react-redux';
import { GameOverMenu } from '../../components/GameOverMenu';
import { newGame } from '../../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    roomId: state.room.id,
    winnerName: state.players.winnerId,
    isHost: state.player.isHost
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { roomId } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    onNewGame: () => dispatch(newGame(roomId))
  };
}

export const GameOverContainer = connect(mapStateToProps, null, mergeProps)(GameOverMenu);
