import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import Mask, { Props as MaskProps } from '../Mask';
import { Props as DialogProps } from '../Mask/Dialog';
import useTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';

export interface Props extends DialogProps, MaskProps, DefaultProps {
}

interface DefaultProps {
  /** 是否开启动画 */
  animation?: boolean;
}

export interface View {
  className?: string;
  onClick: BSL.OnClick<HTMLDivElement>;
  disabled?: boolean;
  children?: any;
  prefixCls?: string;
}

const defaultProps: Required<DefaultProps> = {
  animation: true
};
function Popup(props: Props) {
  const {contentCls, maskCls, id, children } = props;
  const [closing, setClosing] = React.useState(false);
  const [realVisible, setRealVisible] = React.useState(false);
  const [setTimeOut, clearTimeOut] = useTimeout();
  /** 是否处于动画执行的状态中 */
  let isAnimationing = false;
  const animationListener = React.useRef<ListenerCallback>();
  const lazyCloseListener = React.useRef<ListenerCallback>();
  /** 延迟关闭 */
  const lazyClose = (callback?: () => void) => {
    if (props.animation) {
      lazyCloseListener.current = setTimeOut(() => {
        setClosing(false);
        setRealVisible(false);
        if (callback) {
          callback();
        } 
      }, 300);
    } else {
      setRealVisible(false);
      if (callback) {
        callback();
      }
    }
  };
  /** 动画进行中 */
  const onAnimation = (onAnimationVisible: boolean, callback?: () => void) => {
    if (isAnimationing) {
      return;
    }
    isAnimationing = true;

    if (onAnimationVisible === false) {
      setClosing(true);
      lazyClose(callback);
      isAnimationing = false;
    } else {
      setRealVisible(onAnimationVisible);
      if (callback) {
        callback();
      }

      animationListener.current = setTimeOut(() => {
        isAnimationing = false;
      }, 300);
    }
  };
 
  const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClose) {
      props.onClose(e, false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (animationListener.current) {
        clearTimeOut(animationListener.current);
      }
      if (lazyCloseListener.current) {
        clearTimeOut(lazyCloseListener.current);
      }
    };
  }, [clearTimeOut]);

  React.useEffect(() => {
    onAnimation(props.visible);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);
  
  return (
    <Mask
      {...props}
      id={id}
      visible={realVisible}
      maskCls={classNames(maskCls, css(
        props.animation && styles.fadein,
        props.animation && closing && styles.fadeout
      ))}
      contentCls={classNames(contentCls, css(
        props.animation && styles.enter,
        props.animation && closing && styles.leave
      ))}
      onClose={onClose}
    >
      {children}
    </Mask>
  );
}

Popup.defaultProps = defaultProps;
export default Popup;
