import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

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
    <div className={classNames(css(styles.text, styles.textIcon), `${prefixCls}-text`, `${prefixCls}-text-icon`)}>
      <Icon 
        className={classNames(css(styles.icon, type === 'loading' && styles.iconLoading), `${prefixCls}-icon`, `${prefixCls}-icon-${type}`)}
        src={svgFile[type]}
      />
      <div className={classNames(css(styles.textInfo), `${prefixCls}-text-info`)}>{children}</div>
    </div>
  ) : (
    <div className={classNames(css(styles.text), `${prefixCls}-text`)}>
      <div className={classNames(css(styles.textLabel), `${prefixCls}-text-label`)}>{children}</div>
    </div>
  );
};

export default Toast;