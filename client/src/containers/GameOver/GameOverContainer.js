import { connect } from 'react-redux';
import { GameOverMenu } from '../../components/GameOverMenu';
import { newGame } from '../../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    roomId: state.room && state.room.id,
    winnerId: state.players && state.players.winnerId,
    isHost: state.player && state.player.isHost,
    youWin: state.players && state.player && state.players.winnerId === state.player.id
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
