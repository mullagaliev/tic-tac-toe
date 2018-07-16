import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const PageAnimationHoC = Page => {
  return props =>
      <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
          transitionName="SlideIn"
      >
        <Page {...props} />
      </ReactCSSTransitionGroup>;
};

export default PageAnimationHoC;
