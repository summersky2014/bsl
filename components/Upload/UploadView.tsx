import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
import variable from '../../utils/system/variable';
import Icon from '../Icon';
import styles from './style';


const addSvg = variable.svgRootPath + require('../../assets/add.svg').id;
const clearSvg = variable.svgRootPath + require('../../assets/clear.svg').id;

export interface Props extends BSL.ComponentProps {
  src: string;
  process?: number;
  disabled?: boolean;
  children?: any;
  /** 是否显示默认的占位符 */
  placeholder?: boolean;
  onRemove?: () => void;
}

const prefixCls = 'bsl-upload';
function UploadView(props: Props) {
  const { className, children, src, process, onRemove, disabled, placeholder } = props;
  return (
    <div 
      className={classNames(placeholder ? styles.root : undefined, prefixCls, className)}
      id={props.id}
      style={props.style}
    >
      {placeholder !== false ? (
        <Icon
          className={classNames(styles.addIcon, variable.bslComponent, `${prefixCls}-addIcon`)}
          hide={!!src}
          src={addSvg}
        />
      ) : null}
      {children}
      {placeholder !== false && process !== undefined && src ? (
        <div
          className={classNames(styles.notUploaded, `${prefixCls}-notUploaded`)}
          style={{
            height: (100 - process) + '%'
          }}
        />
      ) : null}
      {placeholder !== false && src && onRemove && !disabled ? (
        <Icon className={classNames(styles.clear, `${prefixCls}-clear`)} src={clearSvg} onClick={onRemove} />
      ) : null}
    </div>
  );
}

export default UploadView;
