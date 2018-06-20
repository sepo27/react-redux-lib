/* @flow */

import {composeStylesTheme} from './composeStylesTheme';

describe('composeStylesTheme()', () => {
  it('should compose', () => {
    const
      styles = {
        container: 'container',
        header: 'header',
      },
      theme = {
        container: 'myContainer',
        footer: 'myFooter',
      };

    expect(composeStylesTheme(styles, theme)).toEqual({
      container: 'container myContainer',
      header: 'header',
      footer: 'myFooter',
    });
  });
});
