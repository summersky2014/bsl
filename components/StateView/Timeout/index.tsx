import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from '../Empty/style';

import variable from '../../../utils/variable';
import Icon from '../../Icon';

type Render = (() => JSX.Element) | JSX.Element | undefined;

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

function Timeout() {
  let render;
  if (Timeout.render) {
    if (typeof Timeout.render === 'function') {
      render = Timeout.render();
    } else {
      render = Timeout.render;
    }
  } else {
    render = (
      <div className={classNames(css(styles.root), prefixCls)}>
        <Icon src={emptySvg} />
        <div className={classNames(css(styles.label), `${prefixCls}-label`)}>抱歉，请求超时了</div>
        <div className={classNames(css(styles.label), `${prefixCls}-label`)}>轻触屏幕重试</div>
      </div>
    );
  }
  return render;
}

Timeout.render = undefined as Render;
export default Timeout;
