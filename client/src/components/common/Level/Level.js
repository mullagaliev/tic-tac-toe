import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'semantic-ui-react';
import './Level.sass';


class Level extends Component {
  render() {
    const { level } = this.props;
    return (
      <span className={classnames('Level', this.props.className)}>
        <Icon name='trophy' size="large" color="white"/>
        <span>Level {level}</span>
      </span>
    );
  }
}

Level.propTypes = {
  level: PropTypes.number
};
Level.defaultProps = {
  level: 1
};

export default Level;
