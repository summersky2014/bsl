import BSL from '../../typings';
import * as React from 'react';
import variable from '../../utils/variable';
import compressImg from './compressImg';
import UploadView from './UploadView';
import Icon from '../Icon';
import './index.scss';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props extends BSL.ComponentProps {
  src?: string;
  process?: number;
  disabled?: boolean;
  /** 上传模式，图片或文件 */
  mode: 'image' | 'file';
  /** 档图片模式时才有compressSrc和blob */
  onChange: (e: ChangeEvent, file: File, compressSrc?: string, blob?: Blob) => void;
  onRemove?: () => void;
}

const fileSvg = variable.svgRootPath + require('../../assets/file.svg').id;
const prefixCls = 'bsl-upload';
function Upload(props: Props) {
  const { className, disabled, mode } = props;
  const target = React.useRef<HTMLInputElement | null>(null);
  const [src, setSrc] = React.useState(props.src || '');
  const onChange = (e: ChangeEvent) => {
    const files = e.target.files;
    e.persist();
    target.current = e.target;

    if (files) {
      const file = files[0];
      if (mode === 'image') {
        compressImg(file, 750).then((result) => {
          if (result) {
            setSrc(result[0]);
            props.onChange(e, file, result[0], result[1]);
          }
        });
      } else {
        props.onChange(e, files[0]);
        setSrc(fileSvg);
      }
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

  React.useEffect(() => {
    if (props.src !== undefined) {
      setSrc(props.src);
    }

    if (props.src === '' && target.current) {
      target.current.value = '';
    }

    return () => {
      if (target.current) {
        target.current = null;
      }
    };
  }, [props.src]);

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
        accept={mode === 'image' ? 'image/*' : undefined}
      />
      {mode === 'image' ? (
        <img className={`${prefixCls}-img bsl_component`} src={src} data-hide={!src} />
      ) : (
        <Icon
          className={`${prefixCls}-fileIcon bsl_component`}
          src={fileSvg}
          style={{
            display: src ? 'block' : 'none'
          }}
        />
      )}
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

export default React.memo(Upload, areEqual);
