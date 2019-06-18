import BSL from '../../typings';
import * as React from 'react';
import compressImg from './compressImg';
import UploadView from './UploadView';
import memoAreEqual from '../../utils/memoAreEqual';
import './index.scss';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props extends BSL.ComponentProps {
  src?: string;
  process?: number;
  disabled?: boolean;
  onChange: (e: ChangeEvent, file: File, compressSrc: string, blob: Blob) => void;
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
      const file = files[0];
      compressImg(file, 750).then((result) => {
        if (result) {
          setSrc(result[0]);
          props.onChange(e, file, result[0], result[1]);
        }
      });
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
        accept="image/gif,image/jpeg,image/jpg,image/png"
      />
      <img className={`${prefixCls}-img bsl_component`} src={src} data-hide={!src} />
    </UploadView>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps);
}

export default React.memo(UploadImg, areEqual);
