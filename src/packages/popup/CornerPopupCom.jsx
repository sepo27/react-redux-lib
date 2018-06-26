/* @flow */
/* eslint-disable react/no-unused-state */

import * as React from 'react';
import type {PopupProps, PopupRef} from './PopupCom';
import {PopupCom} from './PopupCom';
import type {PositionT, ReactElementRef} from '../../globalTypes';
import {calculateCornerPopupPosition} from './calculateCornerPopupPosition';

type Props = $Diff<PopupProps, {top: number, left: number}> & {
  targetRef: ReactElementRef<*>,
};

type State = {
  targetEl: ?HTMLElement,
  popupEl: ?HTMLDivElement,
  top: number,
  left: number,
  prevShow: boolean,
};

export class CornerPopupCom extends React.Component<Props, State> {
  static getPosition(targetEl: HTMLElement, popupEl: HTMLElement): PositionT {
    const popupRect = popupEl.getBoundingClientRect();
    return calculateCornerPopupPosition(
      targetEl.getBoundingClientRect(),
      {width: popupRect.width, height: popupRect.height},
    );
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const
      {show} = nextProps,
      {targetEl, popupEl, prevShow} = prevState;

    if (targetEl && popupEl && show && show !== prevShow) {
      const position = CornerPopupCom.getPosition(targetEl, popupEl);
      return {top: position.top, left: position.left, prevShow: show};
    }

    return null;
  }

  state: State;
  popupRef: PopupRef;

  constructor() {
    super();
    this.state = {
      init: false,
      targetEl: null,
      popupEl: null,
      top: 0,
      left: 0,
      prevShow: false,
    };
    this.popupRef = React.createRef();
  }

  componentDidMount() {
    const targetEl = this.props.targetRef.current;
    if (!targetEl) {
      throw new Error('Missing target element');
    }

    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      targetEl,
    });
  }

  componentDidUpdate() {
    const
      {show} = this.props,
      {prevShow} = this.state;

    if (show && show !== prevShow) {
      this.setState({popupEl: this.popupRef.current}); // eslint-disable-line react/no-did-update-set-state
    }
  }

  render() {
    const
      {targetRef, ...popupProps} = this.props,
      {top, left} = this.state;

    return (
      <PopupCom
        {...popupProps}
        top={top}
        left={left}
        ref={this.popupRef}
      />
    );
  }
}
