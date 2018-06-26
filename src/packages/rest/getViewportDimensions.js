/* @flow */

type Result = {
  width: number,
  height: number,
};

export const getViewportDimensions = (): Result => ({
  // $FlowFixMe
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  // $FlowFixMe
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
});
