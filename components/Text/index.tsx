import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

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

function Text(props: Props) {
  return (
    <div
      className={classNames(css(
        props.ellipsis && styles.ellipsis,
        !!(props.ellipsisLines && props.ellipsisLines > 0) && styles.ellipsisLines,
        props.justify && styles.justify
      ), props.className)}
      style={{
        WebkitLineClamp: props.ellipsisLines,
        ...props.style
      }}
      onClick={props.onClick}
    >
      {props.justify && typeof props.children === 'string' ? props.children.split('').map((item, i) => (
        <div className={css(styles.justifyItem)} key={item + i}>{item}</div>
      )) : props.children}
    </div>
  );
}

export default Text;