import * as React from 'react';
import Icon from '../../Icon';
import { css } from 'aphrodite/no-important';
import styles from './style';
import variable from '../../../utils/variable';

type Render = (() => JSX.Element) | JSX.Element | undefined;

interface Props {
  children?: any;
}

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;

function Empty(props: Props) {
  const { children } = props;
  let render;
  if (Empty.render) {
    if (typeof Empty.render === 'function') {
      render = Empty.render();
    } else {
      render = Empty.render;
    }
  } else {
    render = (
      <div className={css(styles.root)}>
        <Icon src={emptySvg} />
        <div className={css(styles.label)}>{children || '抱歉，暂无数据'}</div>
      </div>
    );
  }
  return render;
}

Empty.render = undefined as Render;
export default Empty;
