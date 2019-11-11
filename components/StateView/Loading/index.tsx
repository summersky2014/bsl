import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

const prefixCls = 'bsl-stateview-loading';
function Component() {
  return (
    <div className={classNames(css(styles.root), prefixCls)}>
      <div className={css(styles.container)}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className={css(styles.hexagon, styles[`hex_${i}` as keyof typeof styles])} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Component;
