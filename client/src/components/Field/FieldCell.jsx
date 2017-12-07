import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class FieldCell extends Component {
  static defaultProps = {
    value: '-'
  };

  render() {
    return (<div className="td c-mark" value={this.props.value} onClick={this.props.onClick}>
      <Icon className="c-mark__x" name='remove' size="big" color="pink"/>
      <Icon className="c-mark__o" name='circle thin' size="big" color="blue"/>
    </div>);
  }
}

FieldCell.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};
FieldCell.defaultProps = {
  onClick: () => {},
  value: '-'
};

export default FieldCell;
