import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
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
      className={classNames(props.className, {
        [styles.ellipsis]: props.ellipsis,
        [styles.ellipsisLines]: !!(props.ellipsisLines && props.ellipsisLines > 0),
        [styles.justify]: props.justify
      })}
      style={{
        WebkitLineClamp: props.ellipsisLines,
        ...props.style
      }}
      onClick={props.onClick}
    >
      {props.justify && typeof props.children === 'string' ? props.children.split('').map((item, i) => (
        <div className={styles.justifyItem} key={item + i}>{item}</div>
      )) : props.children}
    </div>
  );
}

export default Text;