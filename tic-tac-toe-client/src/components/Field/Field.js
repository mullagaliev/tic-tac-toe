import React from 'react';
import { Icon } from 'semantic-ui-react';
import './Field.sass';

class Cell extends React.Component {
  static defaultProps = {
    value: '-'
  };
  constructor() {
    super();
  }
  onClick() {
    this.props.onChange(this);
  }
  render() {
    return (<div className="td c-mark" value={this.props.value} onClick={this.onClick.bind(this)}>
      <Icon className="c-mark__x" name='remove' size="big" color="pink"/>
      <Icon className="c-mark__o" name='circle thin' size="big" color="blue"/>
    </div>);
  }
}

export default class Field extends React.Component {
  static defaultProps = {
    length: 4
  };
  // UpdateField(value, pos) {
  //   let field = this.state.field;
  //   console.log(field);
  //   field[pos[0]][pos[1]] = value;
  //   this.setState({ field: field });
  // }
  UpdateCell(x, y, value) {
    let field = this.state.field;
    field[x][y] = value;
    this.setState({ field: field });
  }
  onMarkSelect(cell) {
    console.log(cell);
    this.UpdateCell(cell.props.position[0], cell.props.position[1], 'x');
  }
  constructor() {
    super();
    let field = [
      ['x', 'o', 'x', 'x'],
      ['x', '-', '-', 'o'],
      ['x', 'o', 'x', 'x'],
      ['x', '-', 'o', 'o']
    ];
    this.state = { currentPlayer: -1, field: field };
  }
  render() {
    // let fieldLength = this.props.length;

    let field = this.state.field.map((row, keyI) => {
      return <div className="tr" key={keyI}>
        { row.map((cell, keyJ) =>{
          return (<Cell
            key={keyJ}
            position={[keyI, keyJ]}
            value={cell}
            onChange={this.onMarkSelect.bind(this)}/>);
        })}
      </div>;
    });
    return <div className="table b-game-field__table b-game-field__inside">
      {field}
    </div>;
  }
}

export { Field };
