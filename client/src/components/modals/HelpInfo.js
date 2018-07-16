import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export class HelpInfo extends React.Component {
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
        trigger={<Icon onClick={this.handleOpen.bind(this)} name='question circle outline'
                       size="big" color="white"/>}
        open={this.state.modalOpen}
        onClose={this.handleClose.bind(this)}
        basic
        size='small'
    >
      <Header icon='question' content='Помощь'/>
      <Modal.Content>
        <h3>Правила</h3>
        <ul>
          <li>Для победы нужно выставить 4 отметки в ряд/столбик/диагональ</li>
          <li>Игроки ходят поочередно</li>
          <li>После каждого раунда происходит смена сторон</li>
        </ul>
        <h3>Прочее</h3>
        <ul>
          <li>Можно использовать чат для общения</li>
        </ul>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleClose.bind(this)} inverted>
          <Icon name='checkmark'/> <span>Спасибо, я понял</span>
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

export default HelpInfo;
