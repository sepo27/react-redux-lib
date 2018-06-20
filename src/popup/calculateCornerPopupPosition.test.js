/* @flow */

import {calculateCornerPopupPosition} from './calculateCornerPopupPosition';
import {mockViewportDimensions, unmockViewportDimensions} from '../../../test/mocks/mockViewportDimensions';
import {mockWindowScrollPosition, unmockWindowScrollPosition} from '../../../test/mocks/mockWindowScrollPosition';

const assertPopupPosition = ({target, popup, expectedPosition}) => {
  // $FlowFixMe
  const position = calculateCornerPopupPosition(target, popup);
  expect(position).toEqual(expectedPosition);
};

describe('calculateCornerPopupPosition()', () => {
  beforeEach(() => {
    mockViewportDimensions({
      width: 900,
      height: 600,
    });
    mockWindowScrollPosition({top: 0, left: 0});
  });

  afterEach(() => {
    unmockViewportDimensions();
    unmockWindowScrollPosition();
  });

  it('target: center => position: top right', () => {
    const
      target = {
        top: 170,
        left: 175,
        width: 140,
        height: 16,
      },
      popup = {
        width: 145,
        height: 26,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 144,
        left: 315,
      },
    });
  });

  it('target: center => position: top right | with vertical scroll', () => {
    mockWindowScrollPosition({
      top: 30,
      left: 0,
    });

    const
      target = {
        top: 170,
        left: 175,
        width: 140,
        height: 16,
      },
      popup = {
        width: 145,
        height: 26,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 174,
        left: 315,
      },
    });
  });

  it('target: center => position: center | with vertical & horizontal shift', () => {
    const
      target = {
        top: 300,
        left: 400,
        width: 200,
        height: 100,
      },
      popup = {
        height: 350,
        width: 450,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 250,
        left: 0,
      },
    });
  });

  it('target: center => position: center | with vertical & horizontal shift & scroll', () => {
    mockWindowScrollPosition({top: 30, left: 0});

    const
      target = {
        top: 300,
        left: 400,
        width: 200,
        height: 100,
      },
      popup = {
        height: 350,
        width: 450,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 280,
        left: 0,
      },
    });
  });

  it('target: top left => position: bottom right', () => {
    const
      target = {
        top: 30,
        left: 20,
        width: 140,
        height: 16,
      },
      popup = {
        width: 145,
        height: 50,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 46,
        left: 160,
      },
    });
  });

  it('target: top left => position: bottom right | with vertical scroll', () => {
    mockWindowScrollPosition({
      top: 45,
      left: 0,
    });

    const
      target = {
        top: 30,
        left: 20,
        width: 140,
        height: 16,
      },
      popup = {
        width: 145,
        height: 50,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 91,
        left: 160,
      },
    });
  });

  it('target: top left => position: bottom right | with shift up', () => {
    const
      target = {
        top: 200,
        left: 20,
        width: 140,
        height: 100,
      },
      popup = {
        width: 145,
        height: 400,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 200,
        left: 160,
      },
    });
  });

  it('target: top left => position: bottom right | with shift up & scroll', () => {
    mockWindowScrollPosition({top: 50, left: 0});

    const
      target = {
        top: 200,
        left: 20,
        width: 140,
        height: 100,
      },
      popup = {
        width: 145,
        height: 400,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 250,
        left: 160,
      },
    });
  });

  it('target: top center => position: bottom right', () => {
    const
      target = {
        top: 20,
        left: 300,
        width: 200,
        height: 50,
      },
      popup = {
        width: 50,
        height: 50,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 70,
        left: 500,
      },
    });
  });

  it('target: top right => position: bottom left', () => {
    const
      target = {
        top: 20,
        left: 800,
        width: 100,
        height: 50,
      },
      popup = {
        width: 150,
        height: 50,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 70,
        left: 650,
      },
    });
  });

  it('target: center right => position: top left', () => {
    const
      target = {
        top: 170,
        left: 600,
        width: 200,
        height: 50,
      },
      popup = {
        width: 145,
        height: 26,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 144,
        left: 455,
      },
    });
  });

  it('target: center right => position: top left | with shift left', () => {
    const
      target = {
        top: 170,
        left: 300,
        width: 250,
        height: 50,
      },
      popup = {
        width: 400,
        height: 150,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 20,
        left: 0,
      },
    });
  });

  it('target: bottom right => position: top left', () => {
    const
      target = {
        top: 500,
        left: 800,
        width: 100,
        height: 50,
      },
      popup = {
        width: 150,
        height: 70,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 430,
        left: 650,
      },
    });
  });

  it('target: bottom center => position: top right', () => {
    const
      target = {
        top: 500,
        left: 450,
        width: 60,
        height: 50,
      },
      popup = {
        width: 150,
        height: 70,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 430,
        left: 510,
      },
    });
  });

  it('target: bottom left => position: top right', () => {
    const
      target = {
        top: 500,
        left: 20,
        width: 60,
        height: 50,
      },
      popup = {
        width: 150,
        height: 70,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 430,
        left: 80,
      },
    });
  });

  it('target: center left => position: top right', () => {
    const
      target = {
        top: 300,
        left: 20,
        width: 60,
        height: 50,
      },
      popup = {
        width: 150,
        height: 70,
      };

    assertPopupPosition({
      target,
      popup,
      expectedPosition: {
        top: 230,
        left: 80,
      },
    });
  });
});
