import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.sass';
import FieldCell from './FieldCell';


export class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field ? props.field : [[]]
    };
  }

  UpdateCell = (x, y) => {
    const { marker } = this.props;
    let field = this.state.field.slice();
    field[x][y] = { val: marker };
    this.setState({ field });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      field: nextProps.field
    });
  }

  render() {
    const { field } = this.state;
    const { enable, Move } = this.props;
    const fieldCells = field.map((row, keyRow) => {
      return <div className="tr" key={keyRow}>
        {row.map((cell, keyCell) => {
          return (<FieldCell
              key={(4 * keyRow) + keyCell}
              row={keyRow}
              cell={keyCell}
              value={cell.val}
              onClick={() => {
                if (enable) {
                  // optimistic ui
                  this.UpdateCell(keyRow, keyCell);
                  Move(keyRow, keyCell);
                }
              }
              }/>);
        })}
      </div>;
    });
    return <div
        className={'table b-game-field__table b-game-field__inside' + (enable ? '' : ' disabled')}>
      {fieldCells}
    </div>;
  }
}

Field.propTypes = {
  Move: PropTypes.func,
  field: PropTypes.array,
  marker: PropTypes.string,
  enable: PropTypes.bool
};

Field.defaultProps = {
  Move: () => {
  },
  field: [[]],
  marker: '_',
  enable: false
};

export default Field;
