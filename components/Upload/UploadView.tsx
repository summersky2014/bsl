import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import Icon from '../Icon';
import variable from '../../utils/system/variable';

const addSvg = variable.svgRootPath + require('../../assets/add.svg').id;
const clearSvg = variable.svgRootPath + require('../../assets/clear.svg').id;

interface Props extends BSL.ComponentProps {
  src: string;
  process?: number;
  disabled?: boolean;
  children?: any;
  onRemove?: () => void;
}

const prefixCls = 'bsl-upload';
function UploadView(props: Props) {
  const { className, children, src, process, onRemove, disabled } = props;
  return (
    <div 
      className={classNames(css(styles.root), prefixCls, className)}
      id={props.id}
      style={props.style}
    >
      <Icon
        className={classNames(css(styles.addIcon), variable.bslComponent, `${prefixCls}-addIcon`)}
        hide={!!src}
        src={addSvg}
      />
      {children}
      {process !== undefined && src ? (
        <div
          className={classNames(css(styles.notUploaded), `${prefixCls}-notUploaded`)}
          style={{
            height: (100 - process) + '%'
          }}
        />
      ) : null}
      {src && onRemove && !disabled ? (
        <Icon className={classNames(css(styles.clear), `${prefixCls}-clear`)} src={clearSvg} onClick={onRemove} />
      ) : null}
    </div>
  );
}

export default UploadView;
