import * as React from 'react';
import './index.scss';

const prefixCls = 'bsl-stateview-loading';
function Component() {
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-container`}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className={`${prefixCls}-hexagon ${prefixCls}-hex_${i}`} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Component;
