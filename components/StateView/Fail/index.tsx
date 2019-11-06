import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from '../Empty/style';

import variable from '../../../utils/variable';
import Icon from '../../Icon';

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

function Fail() {
  return (
    <div className={classNames(css(styles.root), prefixCls)}>
      <Icon src={emptySvg} />
      <div className={classNames(css(styles.label), `${prefixCls}-label`)}>抱歉，服务器出错了</div>
      <div className={classNames(css(styles.label), `${prefixCls}-label`)}>轻触屏幕重试</div>
    </div>
  );
}

export default Fail;
