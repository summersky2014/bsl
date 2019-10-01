
import BSL from '../../typings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as classNames from 'classnames';
import ToastPure, { ToastProps } from './Toast';
import { getContainer } from '../../utils/getContainer';
import useTimeout, {  ListenerCallback } from '../../hooks/anyuseTimeout';
import './index.scss';

interface Props extends ToastProps, BSL.ComponentProps {
  duration?: number;
  mask?: boolean;
}

export const prefixCls = 'bsl-toast';
let container: HTMLElement | null = null;

function Toast(props: Props) {
  const { mask, className, duration } = props;
  const [fade, setFade] = React.useState(false);
  const [setTimeOut, clearTimeOut] = useTimeout();

  React.useEffect(() => {
    let closeCallback: ListenerCallback | undefined;
    let unmountCallback: ListenerCallback | undefined;
    const close = () => {
      setFade(false);
      unmountCallback = setTimeOut(function unmountTimer() {
        Toast.close();
      }, 300);
    };
    const startCloseTimer = () => {
      if (duration) {
        closeCallback = setTimeOut(function closeTimer() {
          close();
        }, duration - 300);
      }
    };
    const clearCloseTimer = () => {

      if (closeCallback) {
        clearTimeOut(closeCallback);
      }

      if (unmountCallback) {
        clearTimeOut(unmountCallback);
      }
    };

    startCloseTimer();
    setFade(true);

    return clearCloseTimer;
  }, []);

  return (
    <div
      className={classNames(className, {
        [prefixCls]: true,
        [`${prefixCls}-fade`]: fade,
        [`${prefixCls}-mask`]: mask,
        [`${prefixCls}-nomask`]: !mask
      })}
    >
      <ToastPure {...props}>{props.children}</ToastPure>
    </div>
  );
}

Toast.show = function(content: string, icon: ToastProps['type'], duration = 3000) {
  Toast.close();
  container = getContainer();
  ReactDom.render((
    <Toast duration={duration} type={icon}>{content}</Toast>
  ), container);
};

Toast.close = function() {
  if (container) {
    ReactDom.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  }
};

Toast.loading = function(content: string) {
  Toast.close();
  container = getContainer();
  ReactDom.render((
    <Toast className={`${prefixCls}-loading`} type="loading" duration={Number.MAX_SAFE_INTEGER} mask>{content}</Toast>
  ), container);
};

export default Toast;