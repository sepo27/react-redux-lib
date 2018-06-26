/* @flow */

import type {PositionT, Dimensions} from '../../globalTypes';
import {getViewportDimensions, getWindowScrollPosition} from '../index';

export const calculateCornerPopupPosition = (targetRect: ClientRect, popupDimensions: Dimensions): PositionT => {
  const
    viewport = getViewportDimensions(),
    scroll = getWindowScrollPosition(),
    targetTop = targetRect.top + scroll.top,
    targetLeft = targetRect.left + scroll.left;

  let
    top = targetTop - popupDimensions.height,
    left = targetLeft + targetRect.width;

  // top corrections
  const spaceTop = targetRect.top;
  if (popupDimensions.height > spaceTop) {
    // try bottom
    top = targetTop + targetRect.height;

    const spaceBottom = viewport.height - targetRect.top - targetRect.height;
    if (popupDimensions.height > spaceBottom) {
      // shift up
      top -= (popupDimensions.height - spaceBottom);
    }
  }

  // left corrections
  const spaceRight = viewport.width - targetRect.left - targetRect.width;
  if (popupDimensions.width > spaceRight) {
    // try left
    left = targetLeft - popupDimensions.width;

    const spaceLeft = targetRect.left;
    if (popupDimensions.width > spaceLeft) {
      // shift right
      left += (popupDimensions.width - spaceLeft);
    }
  }

  return {top, left};
};
