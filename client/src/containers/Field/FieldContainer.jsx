import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Field from '../../components/Field/Field';
import { Move } from '../../services/game/api';
import logger from '../../helpers/logger';
import { subscribeToUpdate } from '../../services/game/api';


const initField = (size = 4) => {
  return _.times(size, () => {
    return _.times(size, () => {
      return { val: '_' };
    });
  });
};

class FieldContainer extends Component {
  state = {
    currentPlayer: -1,
    field: initField(4)
  };

  didMove = (row, cell) => {
    logger(`Start move with params row = ${row}, cell = ${cell}`);
    Move(this.props.roomId, row, cell, () => {
      logger(`Success move with params row = ${row}, cell = ${cell}`);
    });
    logger(`Finish move with params row = ${row}, cell = ${cell}`);
  };

  componentDidMount() {
    subscribeToUpdate((err, field) => {
      this.setState({ field: field });
    });
  }

  render() {
    const { field } = this.state;
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
  roomId: '-1'
};

export default FieldContainer;
