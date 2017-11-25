import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SimpleScreen.sass';

class SimpleScreen extends Component {
  render() {
    const { header, children, footer } = this.props;
    const { blurBg } = this.props;
    return <div className="App">
      <div className={ 'bg-image ' + (blurBg ? 'bg-image--blur' : '') }>
      </div>
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
  footer: PropTypes.node,
  blurBg: PropTypes.bool
};
SimpleScreen.defaultProps = {
  nav: null,
  content: null,
  footer: null,
  blurBg: false
};

export default SimpleScreen;
