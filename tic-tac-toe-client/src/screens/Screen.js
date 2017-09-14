import React from 'react';
import './Screen.sass';

export default class Screen extends React.Component {
  static defaultProps = {
    nav: null,
    content: null,
    footer: null
  };
  render() {
    return <div className="Screen">
      {this.props.nav ? (<div className="b-top-nav" >
        { this.props.nav }
      </div>) : null }
      <div className="b-content">
        { this.props.content }
      </div>
      {this.props.nav ? (<div className="b-footer" >
        { this.props.footer }
      </div>) : null }
    </div>;
  }
}

export { Screen };
