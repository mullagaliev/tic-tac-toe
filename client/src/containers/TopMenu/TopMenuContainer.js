import { connect } from 'react-redux';
import TopGameMenu from '../../layouts/headers/TopGameMenu';
import PLAYERS_ROLES from '../../constants/playersRoles';
import { newGame } from '../../redux/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    roomId: state.room.id,
    role: state.player.isHost ? PLAYERS_ROLES.HOST : PLAYERS_ROLES.CLIENT,
    level: state.room.level,
    isHost: state.player.isHost
  };
};

function mergeProps(stateProps, dispatchProps) {
  const { roomId } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    onNewGame: () => {
      dispatch(newGame(roomId));
    }
  };
}

export const TopMenuContainer = connect(mapStateToProps, null, mergeProps)(TopGameMenu);
export default TopMenuContainer;
