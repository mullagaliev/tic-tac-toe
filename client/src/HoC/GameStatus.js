import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import GAME_STATUSES from '../constants/gameStatuses';

const GameStatus = Page => {
  return props => {
    const { redirect } = props;
    return redirect ? <Redirect to={redirect}/> : <Page {...props} />;
  };
};

function mapStateToProps(state, ownProps) {
  let redirect = null;
  const { gameStatus } = state;
  const { location } = ownProps;
  if (location && location.pathname) {
    const { pathname } = location;
    if (pathname === '/menu' && gameStatus === GAME_STATUSES.STARTED) {
      redirect = '/game';
    } else if (pathname === '/') {
      redirect = '/menu';
    } else if (pathname === '/game/over' &&
        gameStatus !== GAME_STATUSES.FINISH
    ) {
      redirect = '/game';
    } else if (pathname === '/game' &&
        (gameStatus === GAME_STATUSES.FINISH)) {
      redirect = '/game/over';
    } else if (pathname === '/game' && gameStatus !== GAME_STATUSES.STARTED) {
      redirect = '/menu';
    }
  }
  return {
    ...ownProps,
    redirect: redirect,
    gameStatus: state.gameStatus
  };
}

export const GameStatusHoC = compose(
    withRouter,
    connect(mapStateToProps, {}),
    GameStatus
);

export default GameStatusHoC;
