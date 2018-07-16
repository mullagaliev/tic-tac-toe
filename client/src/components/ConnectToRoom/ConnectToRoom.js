import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { connectToRoom } from '../../redux/actions';
import GAME_STATUSES from '../../constants/gameStatuses';

export class ConnectToRoom extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params.roomId) {
      this.props.connectToRoom(match.params.roomId);
    }
  }

  render() {
    const { gameStatus } = this.props;
    if (gameStatus === GAME_STATUSES.STARTED) {
      return <Redirect to='/game'/>;
    }
    return <div>Connection...</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    gameStatus: state.gameStatus
  };
}

export const ConnectToRoomContainer = compose(
    withRouter,
    connect(mapStateToProps, { connectToRoom })
)(ConnectToRoom);

export default ConnectToRoomContainer;
