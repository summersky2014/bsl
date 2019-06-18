import * as React from 'react';
import Icon from '../Icon';
import variable from '../../utils/variable';

const svgRootPath = variable.svgRootPath;
const svgFile = {
  complete: svgRootPath + require('../../assets/success.svg').id,
  fail: svgRootPath + require('../../assets/fail.svg').id,
  loading: svgRootPath + require('../../assets/loading.svg').id
};

export interface ToastProps {
  type?: 'complete' | 'fail' | 'loading';
  children?: any;
}

const prefixCls = 'bsl-toast';
const Toast = (props: ToastProps) => {
  const { type, children } = props;

  return type ? (
    <div className={`${prefixCls}-text ${prefixCls}-text-icon`}>
      <Icon className={`${prefixCls}-icon ${prefixCls}-icon-${type}`} src={svgFile[type]} />
      <div className={`${prefixCls}-text-info`}>{children}</div>
    </div>
  ) : (
    <div className={`${prefixCls}-text`}>
      <div className={`${prefixCls}-text-label`}>{children}</div>
    </div>
  );
};

export default Toast;