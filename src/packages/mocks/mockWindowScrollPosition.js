/* @flow */

import type {PositionT} from '../../globalTypes';

let originalPosition;

export const mockWindowScrollPosition = ({top, left}: PositionT) => {
  originalPosition = {
    top: window.pageYOffset,
    left: window.pageXOffset,
  };

  window.pageYOffset = top;
  window.pageXOffset = left;
};

export const unmockWindowScrollPosition = () => {
  if (originalPosition) {
    window.pageYOffset = originalPosition.top;
    window.pageXOffset = originalPosition.left;
  }
};
