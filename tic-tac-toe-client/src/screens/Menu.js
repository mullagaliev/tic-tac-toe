import React from 'react';
import { Screen } from './Screen';

export default class Menu extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Screen
      active={ this.props.active }
      content={
        <p>
          Hello world!
        </p>}
    />;
  }
}

export { Menu };
