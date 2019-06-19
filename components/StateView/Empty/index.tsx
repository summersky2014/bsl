import * as React from 'react';
import Icon from '../../Icon';
import variable from '../../../utils/variable';
import './index.scss';

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

function Empty() {
  return (
    <div className={prefixCls}>
      <Icon src={emptySvg} />
      <div className={`${prefixCls}-label`}>暂无数据</div>
    </div>
  );
}

export default Empty;
