import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';
import isPassiveSupported from '../../utils/isPassiveSupported';

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

function Dialog(props: Props) {
  const { children, maskCls, className, contentCls, style } = props;
  const elemRef = React.useRef<HTMLDivElement>(null);
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (props.closable && props.onClose) {
      props.onClose(e);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    elemRef.current!.addEventListener('touchmove', stopPropagation, isPassiveSupported ? { passive: false } : false);

    return () => {
      document.body.style.overflow = '';
      if (elemRef.current) {
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