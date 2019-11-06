import * as React from 'react';
import Icon from '../../Icon';
import { css } from 'aphrodite/no-important';
import styles from './style';
import variable from '../../../utils/variable';

const emptySvg = variable.svgRootPath + require('../../../assets/empty.svg').id;
interface Props {
  children?: any;
}

function Empty(props: Props) {
  const { children } = props;
  return (
    <div className={css(styles.root)}>
      <Icon src={emptySvg} />
      <div className={css(styles.label)}>{children || '抱歉，暂无数据'}</div>
    </div>
  );
}

export default Empty;
