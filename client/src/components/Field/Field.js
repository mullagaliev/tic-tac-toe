import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.sass';
import FieldCell from './FieldCell';


class Field extends Component {
  state = {
    field: [[]]
  };
  UpdateCell = (x, y) => {
    let { field } = this.state;
    field[x][y] = this.props.marker;
    this.setState({ field });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      field: nextProps.field
    });
  }

  componentDidMount() {
    this.setState({
      field: this.props.field
    });
  }

  render() {
    const { field } = this.state;
    const fieldCells = field.map((row, keyRow) => {
      return <div className="tr" key={keyRow}>
        { row.map((cell, keyCell) => {
          return (<FieldCell
            key={keyCell}
            row={keyRow}
            cell={keyCell}
            value={cell.val}
            onClick={() => {
              // optimistic ui
              this.UpdateCell(keyRow, keyCell);
              this.props.Move(keyRow, keyCell);
            }
            }/>);
        })}
      </div>;
    });
    return <div
      className={'table b-game-field__table b-game-field__inside' + (this.props.enable ? '' : ' disabled') }>
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
  roomInfo: null,
  marker: '_',
  enable: false
};

export default Field;
