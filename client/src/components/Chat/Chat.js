import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Button } from 'semantic-ui-react';
import logger from '../../helpers/logger';
import './Chat.sass';

class Chat extends Component {
  state = {
    message: ''
  };

  onSend = (e) => {
    e.preventDefault();
    const { message } = this.state;
    const cb = () => {
      logger('Your message sent successfully');
      this.setState({ message: '' });
    };
    this.props.onSend(message, cb);
  };

  onChangeMessageText = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { message } = this.state;
    return (<div className="b-chat">
      <form onSubmit={this.onSend}>
        <Input
            fluid
            action={
              <Button type="submit" color='blue'>
                <span>
                  <Icon name='send'/>
                  Send
                </span>
              </Button>
            }
            value={message}
            onChange={this.onChangeMessageText}/>
      </form>
    </div>);
  }
}

Chat.propTypes = {
  onSend: PropTypes.func
};
Chat.defaultProps = {
  onSend: () => {
  }
};

export default Chat;
