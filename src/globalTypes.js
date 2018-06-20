/* @flow */

import React from 'react';

export type MouseEventHandler = SyntheticMouseEvent<*> => void;

// $FlowFixMe: TODO: ?
export type ReactElementRef<ElementType> = {current: React.ElementRef<ElementType> | null};

export type Dimensions = {
  width: number,
  height: number,
};

export type PositionT = {
  top: number,
  left: number,
};
