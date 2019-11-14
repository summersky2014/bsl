import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

interface Props extends BSL.ComponentProps {
  /** 点的个数 */
  count: number;
  /** 激活的索引 */
  activeIndex: number;
}

const prefixCls = 'bsl-carousel-dot';
const Dots = (props: Props) => {
  const { className, style, count, activeIndex } = props;
  const item: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    const isActive = activeIndex === i;
    item.push(
      <div
        key={i}
        className={classNames(css(styles.dotItem, isActive && styles.dotItemActive), `${prefixCls}-item`, {
          [`${prefixCls}-item-active`]: isActive
        })}
      />
    );
  }

  return (
    <div
      className={classNames(css(styles.dot), prefixCls, className)}
      style={style}
    >
      {item}
    </div>
  );
};

export default Dots;