import React from 'react';

export const PageShellHoC = Page => {
  return props => <Page {...props} />;
};

export default PageShellHoC;
