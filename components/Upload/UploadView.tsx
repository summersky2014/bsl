import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../Icon';
import variable from '../../utils/variable';
import './index.scss';

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
      className={classNames(prefixCls, className)}
      id={props.id}
      style={props.style}
    >
      <Icon
        className={classNames(`${prefixCls}-addIcon bsl_component`, {
          ['bsl_component_hide']: src
        })}
        src={addSvg}
      />
      {children}
      {process !== undefined && src ? (
        <div
          className={`${prefixCls}-notUploaded`}
          style={{
            height: (100 - process) + '%'
          }}
        />
      ) : null}
      {src && onRemove && !disabled ? (
        <Icon className={`${prefixCls}-clear`} src={clearSvg} onClick={onRemove} />
      ) : null}
    </div>
  );
}

export default UploadView;
