import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';

export interface Props extends BSL.ComponentProps {
  onClick?: BSL.OnClick<HTMLDivElement>;
  /** 要显示的文本 */
  children?: any;
  /** 单行省略 */
  ellipsis?: boolean;
  /** 多行省略，需要指定高度 */
  ellipsisLines?: number;
  /** 是否需要单行两端对齐 */
  justify?: boolean;
}

const prefixCls = 'bsl-text';
function Text(props: Props) {
  return (
    <div
      className={classNames(prefixCls, props.className, {
        [`${prefixCls}-ellipsis`]: props.ellipsis,
        [`${prefixCls}-ellipsis-lines`]: !!(props.ellipsisLines && props.ellipsisLines > 0),
        [`${prefixCls}-justify`]: props.justify,
        [`${prefixCls}-line-clamp-${props.ellipsisLines}`]: !!props.ellipsisLines
      })}
      style={props.style}
      onClick={props.onClick}
    >
      {props.justify && typeof props.children === 'string' ? props.children.split('').map((item, i) => (
        <div className={`${prefixCls}-justify-item`} key={item + i}>{item}</div>
      )) : props.children}
    </div>
  );
}

export default Text;