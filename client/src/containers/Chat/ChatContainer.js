import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { say } from '../../services/game/api';
import Chat from '../../components/Chat/Chat';

class ChatContainer extends Component {
  onSend = (message, cb) => {
    if (message) {
      say(this.props.roomId, message, cb);
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

export default ChatContainer;
