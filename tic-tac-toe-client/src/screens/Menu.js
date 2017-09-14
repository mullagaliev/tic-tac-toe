import React from 'react';
import { Screen } from './Screen';

export default class Menu extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Screen content={
      <p>
        Hello world!
      </p>}
    />;
  }
}

export { Menu };
