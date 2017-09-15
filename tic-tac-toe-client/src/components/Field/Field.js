import React from 'react';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import './Field.sass';
import { subscribeToUpdate, Move } from '../../api';

class Cell extends React.Component {
  static defaultProps = {
    value: '-'
  };
  constructor() {
    super();
  }
  render() {
    return (<div className="td c-mark" value={this.props.value} onClick={this.props.onClick}>
      <Icon className="c-mark__x" name='remove' size="big" color="pink"/>
      <Icon className="c-mark__o" name='circle thin' size="big" color="blue"/>
    </div>);
  }
}

export default class Field extends React.Component {
  static defaultProps = {
    length: 4,
    roomId: null,
    roomInfo: null,
    marker: '-'
  };
  // UpdateField(value, pos) {
  //   let field = this.state.field;
  //   console.log(field);
  //   field[pos[0]][pos[1]] = value;
  //   this.setState({ field: field });
  // }
  UpdateCell(x, y) {
    let field = this.state.field;
    field[x][y] = this.props.marker;
    this.setState({ field: field });
  }
  onMove(row, cell) {
    console.log(row, cell);
    Move(this.props.roomId, row, cell, ()=>{
      this.UpdateCell(row, cell);
    });
  }
  constructor() {
    super();
    let length = 4;
    let defaultField = _.times(length, ()=>{
      return _.times(length, () => {
        return { val: '_' };
      });
    });
    this.state = { currentPlayer: -1, field: defaultField };
    subscribeToUpdate((err, field) => {
      this.setState({ field: field });
    });
  }
  render() {
    // let fieldLength = this.props.length;
    let field = this.state.field.map((row, keyI) => {
      return <div className="tr" key={keyI}>
        { row.map((cell, keyJ) =>{
          return (<Cell
            key={keyJ}
            row={keyI}
            cell={keyJ}
            value={cell.val}
            onClick={() => this.onMove.bind(this)(keyI, keyJ)}/>);
        })}
      </div>;
    });
    return <div className="table b-game-field__table b-game-field__inside">
      {field}
    </div>;
  }
}

export { Field };
