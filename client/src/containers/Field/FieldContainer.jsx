import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Field from '../../components/Field/Field';
import logger from '../../helpers/logger';


class FieldContainer extends Component {
  state = {
    currentPlayer: -1
  };

  didMove = (row, cell) => {
    const { roomId } = this.props;
    const cb = () => {
      logger(`Success move with params row = ${row}, cell = ${cell}`);
    };
    logger(`Start move with params row = ${row}, cell = ${cell}`);
    this.props.dispatch({
      type: 'doStep',
      data: {
        roomId,
        row,
        cell,
        cb
      }
    });
    logger(`Finish move with params row = ${row}, cell = ${cell}`);
  };

  render() {
    const { field } = this.props;
    return (
        <Field
            {...this.props}
            field={field}
            Move={this.didMove}/>
    );
  }
}

FieldContainer.propTypes = {
  roomId: PropTypes.string
};
FieldContainer.defaultProps = {
  roomId: '-1',
  field: [[]]
};

function mapStateToProps(state) {
  return {
    field: state.field
  };
}

export default connect(mapStateToProps)(FieldContainer);
