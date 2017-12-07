import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Icon } from 'semantic-ui-react';

class CopyButton extends Component {
  state = {
    copied: false
  };

  render() {
    return (<CopyToClipboard
        text={this.props.text}
        onCopy={() => {
          this.setState({ copied: true });
          setTimeout(() => {
            this.setState({ copied: false });
          }, 3000);
        }
        }>
      <Button fluid primary animated='vertical'>
        <Button.Content visible>
          <Icon name='linkify'/>
          {this.props.text}
        </Button.Content>
        <Button.Content hidden>
          <Icon name='copy'/>
          <span> {(this.state.copied ? 'Copied' : 'Copy')}</span>
        </Button.Content>
      </Button>
    </CopyToClipboard>);
  }
}

CopyButton.propTypes = {
  text: PropTypes.string
};
CopyButton.defaultProps = {
  text: ''
};

export default CopyButton;
