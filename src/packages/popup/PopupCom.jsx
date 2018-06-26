/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import styles from './Popup.scss';
import {composeStylesTheme} from '../index';
import type {MouseEventHandler, ReactElementRef} from '../../globalTypes';

const rootEl = document.getElementById('popup');
if (!rootEl) {
  throw new Error('Missing #popup container');
}

const ShowStatus = {
  HIDE: 0,
  PREPARE_SHOW: 1,
  SHOW: 2,
  PREPARE_HIDE: 3,
};

type Theme = {
  container?: string,
  show?: string,
};

export type PopupRef = ReactElementRef<'div'>;

type PopupProps = {
  show: boolean,
  top: number,
  left: number,
  children: React.Node,
  theme?: Theme,
  removeTimeout?: number,
  popupRef?: PopupRef,
  onClick?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
};

type State = {
  showStatus: $Values<typeof ShowStatus>,
  prevShow: boolean,
};

class PopupCom extends React.Component<PopupProps, State> {
  static defaultProps = {
    removeTimeout: 0,
  };

  static getDerivedStateFromProps(nextProps: PopupProps, state: State) {
    if (nextProps.show !== state.prevShow) {
      const
        showStatus = nextProps.show ? ShowStatus.PREPARE_SHOW : ShowStatus.PREPARE_HIDE,
        prevShow = nextProps.show;

      return {showStatus, prevShow};
    }

    return null;
  }

  state: State;
  theme: Theme;

  constructor({show, theme = {}}: PopupProps) {
    super();
    this.state = {
      showStatus: ShowStatus.HIDE,
      prevShow: show, // eslint-disable-line react/no-unused-state
    };
    this.theme = composeStylesTheme(styles, theme);
  }

  componentDidUpdate() {
    const {showStatus} = this.state;
    if (showStatus === ShowStatus.PREPARE_SHOW) {
      setTimeout(() => {
        this.setState({showStatus: ShowStatus.SHOW}); // eslint-disable-line react/no-did-update-set-state
      });
    } else if (showStatus === ShowStatus.PREPARE_HIDE) {
      setTimeout(() => {
        this.setState({showStatus: ShowStatus.HIDE});
      }, this.props.removeTimeout);
    }
  }

  render() {
    if (this.state.showStatus === ShowStatus.HIDE) {
      return null;
    }

    const
      show = this.state.showStatus === ShowStatus.SHOW,
      {
        top,
        left,
        children,
        popupRef,
        onClick,
        onMouseEnter,
        onMouseLeave,
      } = this.props,
      className = cx(this.theme.container, {
        // $FlowFixMe
        [this.theme.show]: show,
      });

    return ReactDOM.createPortal(
      <div
        style={{top, left}}
        className={className}
        ref={popupRef}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>,
      rootEl,
    );
  }
}

type ForwardRefProps = $Diff<PopupProps, {
  popupRef?: PopupRef,
}>;

// $FlowFixMe: TODO: https://github.com/facebook/flow/issues/6103
const ForwardRefCom = React.forwardRef(
  (props: ForwardRefProps, ref: PopupRef) => (
    <PopupCom
      {...props}
      popupRef={ref}
    />
  ),
);

export type {ForwardRefProps as PopupProps};
export {ForwardRefCom as PopupCom};
