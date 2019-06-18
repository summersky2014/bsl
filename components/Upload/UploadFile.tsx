import BSL from '../../typings';
import * as React from 'react';
import UploadView from './UploadView';
import Icon from '../Icon';
import variable from '../../utils/variable';
import './index.scss';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const fileSvg = variable.svgRootPath + require('../../assets/file.svg').id;

interface Props extends BSL.ComponentProps {
  src?: string;
  process?: number;
  disabled?: boolean;
  onChange: (e: ChangeEvent, file: File) => void;
  onRemove?: () => void;
}

const prefixCls = 'bsl-upload';
function UploadImg(props: Props) {
  const { className, disabled } = props;
  const target = React.useRef<HTMLInputElement | null>(null);
  const [src, setSrc] = React.useState(props.src || '');
  const onChange = (e: ChangeEvent) => {
    const files = e.target.files;
    e.persist();
    target.current = e.target;

    if (files) {
      props.onChange(e, files[0]);
      setSrc(fileSvg);
    }
  };
  const onRemove = () => {
    if (target.current) {
      target.current.value = '';
    }

    if (props.onRemove) {
      props.onRemove();
    }

    setSrc('');
  };

  return (
    <UploadView
      className={className}
      id={props.id}
      style={props.style}
      src={src}
      process={props.process}
      disabled={disabled}
      onRemove={onRemove}
    >
      <input
        className={`${prefixCls}-input`}
        type="file"
        onChange={onChange}
        disabled={!!src && !disabled}
      />
      <Icon
        className={`${prefixCls}-fileIcon bsl_component`}
        src={fileSvg}
        style={{
          display: src ? 'block' : 'none'
        }}
      />
    </UploadView>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  const keys = Object.keys(nextProps);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i] as keyof Props;

    if (typeof nextProps[k] !== 'function' && nextProps[k] !== prevProps[k]) {
      return false;
    }
  }

  return true;
}

export default React.memo(UploadImg, areEqual);
