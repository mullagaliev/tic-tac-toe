import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chat from '../../components/Chat/Chat';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions';

class ChatContainer extends Component {
  onSend = (message, cb) => {
    const { roomId } = this.props;
    if (message) {
      this.props.dispatch(sendMessage(roomId, message, cb));
    }
  };

  render() {
    return (<Chat onSend={this.onSend}/>);
  }
}


ChatContainer.propTypes = {
  roomId: PropTypes.string
};
ChatContainer.defaultProps = {
  roomId: null
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(ChatContainer);
