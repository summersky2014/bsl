import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../Icon';
import './index.scss';

const checkCircle = require('../../assets/check-circle.svg');

interface Props extends BSL.ComponentProps {
  active: boolean | undefined;
  children: any;
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
      {props.active ? (
        <Icon className={`${prefixCls}-select`} src={checkCircle} />
      ) : (
        <div className={`${prefixCls}-unselect`} />
      )}
      <div className={`${prefixCls}-text`}>{children}</div>
    </div>
  );
};

export default Radio;
