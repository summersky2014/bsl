import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import Icon from '../Icon';
import variable from '../../utils/variable';

const checkCircle = variable.svgRootPath + require('../../assets/check-circle.svg').id;

interface Props extends BSL.ComponentProps {
  active: boolean | undefined;
  children?: any;
  /** 选中的样式 */
  selectCls?: string;
  /** 未选中的样式 */
  unselectCls?: string;
}

const prefixCls = 'bsl-radio';
const Radio = (props: Props) => {
  const { className, id, style, children } = props;
  return (
    <div
      className={classNames(css(styles.root), className)}
      id={id}
      style={style}
      data-active={props.active}
    >
      <Icon
        className={classNames(css(styles.select), `${prefixCls}-select`, props.selectCls)}
        src={checkCircle}
        hide={!props.active}
      />
      <div
        className={classNames(css(styles.unselect), variable.bslComponent, props.unselectCls)}
        data-hide={props.active}
      />
      {children ? <div className={css(styles.text)}>{children}</div> : null}
    </div>
  );
};

export default Radio;
