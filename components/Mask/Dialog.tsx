import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import isPassiveSupported from '../../utils/isPassiveSupported';
import './index.scss';

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

const prefixCls = 'bsl-mask';
function Dialog(props: Props) {
  const { children, maskCls, className, contentCls, style } = props;
  const elemRef = React.createRef<HTMLDivElement>();
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
      className={classNames(prefixCls, className)}
      style={style}
    >
      <div
        className={classNames(`${prefixCls}-bg`, maskCls)}
        onClick={onClick}
        ref={elemRef}
      />
      <div
        className={classNames(`${prefixCls}-content`, contentCls)}
        onClick={stopPropagation}
      >{children}</div>
    </div>
  );
}

export default Dialog;