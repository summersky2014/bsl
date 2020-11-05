import * as classNames from 'classnames';
import * as React from 'react';
import variable from '../../utils/system/variable';
import Icon from '../Icon';
import styles from './style';


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
    <div className={classNames(styles.text, styles.textIcon, `${prefixCls}-text`, `${prefixCls}-text-icon`)}>
      <Icon 
        className={classNames(styles.icon, `${prefixCls}-icon`, `${prefixCls}-icon-${type}`, {
          [styles.iconLoading]: type === 'loading'
        })}
        src={svgFile[type]}
      />
      <div className={classNames(styles.textInfo, `${prefixCls}-text-info`)}>{children}</div>
    </div>
  ) : (
    <div className={classNames(styles.text, `${prefixCls}-text`)}>
      <div className={classNames(styles.textLabel, `${prefixCls}-text-label`)}>{children}</div>
    </div>
  );
};

export default Toast;