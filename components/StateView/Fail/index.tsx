import * as classNames from 'classnames';
import * as React from 'react';
import variable from '../../../utils/system/variable';
import Icon from '../../Icon';
import styles from '../Empty/style';


type Render = (() => JSX.Element) | JSX.Element | undefined;

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

function Fail() {
  let render;
  if (Fail.render) {
    if (typeof Fail.render === 'function') {
      render = Fail.render();
    } else {
      render = Fail.render;
    }
  } else {
    render = (
      <div className={classNames(styles.root, prefixCls)}>
        <Icon src={emptySvg} />
        <div className={classNames(styles.label, `${prefixCls}-label`)}>抱歉，服务器出错了</div>
        <div className={classNames(styles.label, `${prefixCls}-label`)}>轻触屏幕重试</div>
      </div>
    );
  }
  return render;
}

Fail.render = undefined as Render;
export default Fail;
