import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
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
        className={classNames(styles.dotItem, `${prefixCls}-item`, {
          [styles.dotItemActive]: isActive,
          [`${prefixCls}-item-active`]: isActive
        })}
      />
    );
  }

  return (
    <div
      className={classNames(styles.dot, prefixCls, className)}
      style={style}
    >
      {item}
    </div>
  );
};

export default Dots;