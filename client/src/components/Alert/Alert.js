import React from 'react';
import { Icon } from 'semantic-ui-react';
import AlertContainer from 'react-alert';
import { onError, onInfo, onSuccess } from '../../services/game/api';

export default class Alerter extends React.Component {
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  };

  constructor() {
    super();
    onError((err, msg) => {
      this.msg.show(<div>
        <span>{msg}</span>
      </div>, {
        time: 5000,
        type: 'error',
        icon: <Icon name="warning circle" size="large" color="red"/>
      });
    });
    onInfo((err, msg) => {
      this.msg.show(msg, {
        time: 3000,
        type: 'info',
        icon: <Icon name="info" size="large" color="blue"/>
      });
    });
    onSuccess((err, msg) => {
      this.msg.show(msg, {
        time: 3000,
        type: 'success',
        icon: <Icon name="birthday" size="large" color="green"/>
      });
    });
  }

  render() {
    return (<div>
      <AlertContainer ref={(a) => {
        this.msg = a;
      } } {...this.alertOptions} />
    </div>);
  }
}

export { Alerter };
