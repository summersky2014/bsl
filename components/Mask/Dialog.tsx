import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';
import isPassiveSupported from '../../utils/is/isPassiveSupported';
import device from '../../utils/device';

export interface Props extends BSL.ComponentProps {
  children: any;
  /** 关闭事件 */
  onClose?: BSL.OnClick<HTMLDivElement>;
  /** 是否允许点击背景关闭 */
  closable?: boolean;
  /** 背景样式 */
  maskCls?: string;
  /** 内容的样式 */
  contentCls?: string;
}

const stopPropagation = (e: React.MouseEvent<HTMLDivElement> | Event) => {
  e.preventDefault();
  e.stopPropagation();
};

function Dialog(props: Props) {
  const { children, maskCls, className, contentCls, style } = props;
  const elemRef = React.useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (props.closable && props.onClose) {
      props.onClose(e);
    }
  };

  React.useEffect(() => {
    const scrollY = window.scrollY;

    if (device.system === 'ios') {
      document.body.style.cssText= `position: fixed;width: 100%;height: 100vh;top: -${scrollY}px`;
    } else {
      document.body.style.overflow = 'hidden';
    }
    elemRef.current!.addEventListener('touchmove', stopPropagation, isPassiveSupported ? { passive: false } : false);

    return () => {
      if (device.system === 'ios') {
        document.body.style.cssText= '';
        window.scrollTo({ top: scrollY });
      } else {
        document.body.style.overflow = '';
      }
      if (elemRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        elemRef.current.removeEventListener('touchmove', stopPropagation);
      }
    };
  }, []);

  return (
    <div
      className={classNames(css(styles.root), className)}
      style={style}
    >
      <div
        className={classNames(css(styles.bg), maskCls)}
        onClick={onClick}
        ref={elemRef}
      />
      <div
        className={classNames(css(styles.content), contentCls)}
        onClick={stopPropagation}
      >{children}</div>
    </div>
  );
}

export default Dialog;