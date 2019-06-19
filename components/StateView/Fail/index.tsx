import * as React from 'react';
import Icon from '../../Icon';
import variable from '../../../utils/variable';
import '../Empty/index.scss';

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

function Fail() {
  return (
    <div className={prefixCls}>
      <Icon src={emptySvg} />
      <div className={`${prefixCls}-label`}>程序异常</div>
      <div className={`${prefixCls}-label`}>轻触屏幕重试</div>
    </div>
  );
}

export default Fail;
