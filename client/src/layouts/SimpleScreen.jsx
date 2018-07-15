import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './SimpleScreen.sass';

class SimpleScreen extends Component {
  render() {
    const { header, children, footer } = this.props;
    return <div className={classnames('App')}>
      {header ? (<div className="b-top-nav">
        { header }
      </div>) : null }
      <div className="b-content">
        { children }
      </div>
      {footer ? (<div className="b-footer">
        { footer }
      </div>) : null }
    </div>;
  }
}

SimpleScreen.propTypes = {
  nav: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node
};
SimpleScreen.defaultProps = {
  nav: null,
  content: null,
  footer: null
};

export default SimpleScreen;
