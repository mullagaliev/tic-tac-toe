import React from 'react';
import { Icon, Input, Button } from 'semantic-ui-react';
// import _ from 'lodash';
import { say } from '../../api';
import './Chat.sass';

export default class Chat extends React.Component {
  static defaultProps = {
    roomId: null
  };
  constructor() {
    super();
    this.state = { message: '' };
  }
  onSend() {
    let val = this.state.message;
    if (val) {
      say(this.props.roomId, val, () =>{
        console.log('message send');
        this.setState({ message: '' });
      });
    }
  }
  submit(e) {
    e.preventDefault();
    this.onSend();
  }
  render() {
    return (<div className="b-chat">
      <form onSubmit={ this.submit.bind(this) }>
        <Input
          fluid
          action={
            <Button type="submit" color='blue'>
              <span><Icon name='send'/>Send </span>
            </Button>
          }
          value={this.state.message}
          onChange={(event) => {
            this.setState({ message: event.target.value });
          }
          }
        />
      </form>
    </div>);
  }
}

export { Chat };
