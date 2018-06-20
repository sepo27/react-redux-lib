/* @flow */

import type {Dimensions} from '../globalTypes';

let originalDimensions;

export const mockViewportDimensions = ({width, height}: Dimensions) => {
  originalDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.innerWidth = width;
  window.innerHeight = height;

  return originalDimensions;
};

export const unmockViewportDimensions = () => {
  if (originalDimensions) {
    window.innerWidth = originalDimensions.width;
    window.innerHeight = originalDimensions.height;
  }
};
