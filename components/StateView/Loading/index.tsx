import { css } from 'aphrodite/no-important';
import * as classNames from 'classnames';
import * as React from 'react';
import styles from './style';

type Render = (() => JSX.Element) | JSX.Element | undefined;

const prefixCls = 'bsl-stateview-loading';
function Loading() {
  let render;
  if (Loading.render) {
    if (typeof Loading.render === 'function') {
      render = Loading.render();
    } else {
      render = Loading.render;
    }
  } else {
    render = (
      <div className={classNames(css(styles.root), prefixCls)}>
        <div className={css(styles.container)}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div className={css(styles.hexagon, styles[`hex_${i}` as keyof typeof styles])} key={i} />
          ))}
        </div>
      </div>
    );
  }
  return render;
}

Loading.render = undefined as Render;
export default Loading;
