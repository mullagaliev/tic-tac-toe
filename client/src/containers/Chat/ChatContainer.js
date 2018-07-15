import Chat from '../../components/Chat/Chat';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
      ...ownProps,
    roomId: state.room.id,
    messages: state.messages
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { roomId } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    onSend: (message, cb) => {
      if (message) {
        dispatch(sendMessage(roomId, message, cb));
      }
    }
  };
}

export const ChatContainer = connect(mapStateToProps, null, mergeProps)(Chat);
