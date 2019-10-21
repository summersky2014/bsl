
import BSL from '../../typings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as classNames from 'classnames';
import ToastPure, { ToastProps } from './Toast';
import { getContainer } from '../../utils/getContainer';
import useTimeout, {  ListenerCallback } from '../../hooks/anyuseTimeout';
import './index.scss';

interface Props extends ToastProps, BSL.ComponentProps, DefaultProps {
  /** 是否添加遮罩层
   * @default loading状态默认添加
   */
  mask?: boolean;
  /** 关闭时触发 */
  onClose?: () => void;
}

interface DefaultProps {
  /**
   * 持续时间
   * @default 3000ms
   */
  duration?: number;
}

export const prefixCls = 'bsl-toast';
const defaultProps: Required<DefaultProps> = {
  duration: 3000
};
let container: HTMLElement | null = null;
function Toast(props: Props) {
  const { mask, className, duration, onClose, type } = props;
  const [fade, setFade] = React.useState(false);
  const [setTimeOut, clearTimeOut] = useTimeout();

  React.useEffect(() => {
    let closeCallback: ListenerCallback | undefined;
    let unmountCallback: ListenerCallback | undefined;
    const close = () => {
      setFade(false);
      unmountCallback = setTimeOut(() => {
        Toast.close();
        if (onClose) {
          onClose();
        }
      }, 300);
    };
    const startCloseTimer = () => {
      if (duration && type !== 'loading') {
        closeCallback = setTimeOut(() => {
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

Toast.show = function(content: string, icon?: 'complete' | 'fail', duration = 3000) {
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

Toast.defaultProps = defaultProps;
export default Toast;