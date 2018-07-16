import { MessageList } from '../../components/Chat';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    messages: state.messages.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    })
  };
}

export const MessageListContainer = connect(mapStateToProps)(MessageList);
