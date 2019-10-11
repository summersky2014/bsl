import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../Icon';
import variable from '../../utils/variable';
import './index.scss';

const checkCircle = require('../../assets/check-circle.svg');

interface Props extends BSL.ComponentProps {
  active: boolean | undefined;
  children?: any;
}

const prefixCls = 'bsl-radio';
const Radio = (props: Props) => {
  const { className, id, style, children } = props;
  return (
    <div
      className={classNames(prefixCls, className)}
      id={id}
      style={style}
      data-active={props.active}
    >
      <Icon className={`${prefixCls}-select`} src={checkCircle} hide={!props.active} />
      <div className={classNames(`${prefixCls}-unselect`, variable.bslComponent)} data-hide={props.active} />
      {children ? <div className={`${prefixCls}-text`}>{children}</div> : null}
    </div>
  );
};

export default Radio;
