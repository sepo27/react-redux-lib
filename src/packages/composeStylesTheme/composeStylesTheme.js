/* @flow */

import cx from 'classnames';

export const composeStylesTheme = (styles: Object, theme: Object): Object =>
  Object
    .keys(styles)
    .concat(Object.keys(theme))
    .filter((v, i, arr) => arr.indexOf(v) === i) // unique
    .reduce((acc, k) => ({
      ...acc,
      [k]: (
        styles[k] && theme[k]
          ? cx(styles[k], theme[k])
          : styles[k] || theme[k]
      ),
    }), {});
