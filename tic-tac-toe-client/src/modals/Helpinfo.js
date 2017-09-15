import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default class Helpinfo extends React.Component {
  static defaultProps = {
    button: null
  };
  render() {
    return (<Modal
      trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      basic
      size='small'
    >
      <Header icon='browser' content='Cookies policy' />
      <Modal.Content>
        <h3>This website uses cookies to ensure the best user experience.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleClose} inverted>
          <Icon name='checkmark' /> Got it
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

export { Helpinfo };
