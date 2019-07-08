import * as React from 'react';
import Icon from '../../Icon';
import variable from '../../../utils/variable';
import './index.scss';

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
const prefixCls = 'bsl-stateview-empty';

interface Props {
  children?: any;
}

function Empty(props: Props) {
  const { children } = props;
  return (
    <div className={prefixCls}>
      <Icon src={emptySvg} />
      <div className={`${prefixCls}-label`}>{children || '暂无数据'}</div>
    </div>
  );
}

export default Empty;
