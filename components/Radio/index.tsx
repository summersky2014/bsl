import { css } from 'aphrodite/no-important';
import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
import variable from '../../utils/system/variable';
import Container from '../Container';
import Icon from '../Icon';
import styles from './style';


const checkCircle = variable.svgRootPath + require('../../assets/check-circle.svg').id;

interface Props extends BSL.ComponentProps {
  active: boolean | undefined;
  /** 选中图标资源地址 */
  icon?: string;
  children?: any;
  activeCls?: string;
  /** 选中的样式 */
  selectCls?: string;
  /** 未选中的样式 */
  unselectCls?: string;
  /** content样式 */
  contentCls?: string;
}

const prefixCls = 'bsl-radio';
const Radio = (props: Props) => {
  const { className, id, style, children } = props;
  return (
    <div
      className={classNames(css(styles.root), className,{
        [props.activeCls || '']: props.active
      })}
      id={id}
      style={style}
      data-active={props.active}
    >
      <Icon
        className={classNames(css(styles.select), `${prefixCls}-select`, props.selectCls)}
        src={props.icon || checkCircle}
        hide={!props.active}
      />
      <div
        className={classNames(css(styles.unselect), variable.bslComponent, props.unselectCls)}
        data-hide={props.active}
      />
      {children ? (
        <Container
          className={classNames(css(styles.content), props.contentCls)}
          flex={1}
        >{children}</Container>
      ) : null}
    </div>
  );
};

export default Radio;
