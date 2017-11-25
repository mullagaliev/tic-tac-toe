import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default class HelpInfo extends React.Component {
  constructor() {
    super();
    this.state = { modalOpen: false };
  }
  handleOpen() {
    this.setState({ modalOpen: true });
  }
  handleClose() {
    this.setState({ modalOpen: false });
  }
  render() {
    return (<Modal
      trigger={<Icon onClick={this.handleOpen.bind(this)} name='question circle outline' size="big" color="white"/>}
      open={this.state.modalOpen}
      onClose={this.handleClose.bind(this)}
      basic
      size='small'
    >
      <Header icon='child' content='Hello' />
      <Modal.Content>
        <h3>This is my solution Evaluation Test for <a href="http://forasoft.com/en/" target="_blank">Forasoft</a></h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleClose.bind(this)} inverted>
          <Icon name='checkmark' /> I understood
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

export { HelpInfo };
