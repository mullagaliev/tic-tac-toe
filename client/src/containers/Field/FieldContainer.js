import { connect } from 'react-redux';
import { Field } from '../../components/Field';
import { doStep } from '../../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    roomId: state.room.id,
    field: state.field,
    marker: state.player.marker,
    enable: state.players.isCurrent
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { roomId } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    Move: (row, cell) => {
      dispatch(doStep(roomId, row, cell));
    }
  };
}

export default connect(mapStateToProps, null, mergeProps)(Field);
