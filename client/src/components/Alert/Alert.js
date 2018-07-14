import React from 'react';
import { Icon } from 'semantic-ui-react';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';

export class Alerter extends React.Component {
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  };

  showError = (msg) => {
    this.msg.show(<div>
      <span>{msg}</span>
    </div>, {
      time: 5000,
      type: 'error',
      icon: <Icon name="warning circle" size="large" color="red"/>
    });
  };

  showInfo = (msg) => {
    this.msg.show(msg, {
      time: 3000,
      type: 'info',
      icon: <Icon name="info" size="large" color="blue"/>
    });
  };

  showSuccess = (msg) => {
    this.msg.show(msg, {
      time: 3000,
      type: 'success',
      icon: <Icon name="birthday" size="large" color="green"/>
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      const { text, type } = this.props.info;
      switch (type) {
        case 'error':
            this.showError(text);
            break;
        case 'info':
          this.showInfo(text);
          break;
        case 'success':
          this.showSuccess(text);
          break;
        default:
          this.showInfo(text);
          break;
      }
    }
  }

  render() {
    return (<div>
      <AlertContainer ref={(a) => {
        this.msg = a;
      }} {...this.alertOptions} />
    </div>);
  }
}

export const AlerterContainer = connect((state)=>{
 return {
   info: state.info
 };
})(Alerter);

export default Alerter;
