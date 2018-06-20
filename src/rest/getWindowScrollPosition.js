/* @flow */

type Result = {
  top: number,
  left: number,
};

export const getWindowScrollPosition = (): Result => ({
  top: window.pageYOffset !== undefined
    ? window.pageYOffset
    // $FlowFixMe
    : document.documentElement.scrollTo,
  left: window.pageXOffset !== undefined
    ? window.pageXOffset
    // $FlowFixMe
    : document.documentElement.scrollLeft,
});
