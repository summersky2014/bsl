import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
import device from '../../utils/device';
import memoAreEqual from '../../utils/system/memoAreEqual';
import variable from '../../utils/system/variable';
import Icon from '../Icon';
import compressImg from './compressImg';
import styles from './style';
import UploadView, { Props as UploadViewProps } from './UploadView';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props extends BSL.ComponentProps, Pick<UploadViewProps, 'placeholder'> {
  src?: string;
  process?: number;
  disabled?: boolean;
  /** 上传模式，图片或文件 */
  mode: 'image' | 'file';
  /** 档图片模式时才有compressSrc和blob */
  onChange: (e: ChangeEvent, file: File, compressSrc?: string, blob?: Blob) => void;
  onRemove?: () => void;
  /** 点击加号 */
  onAddClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const fileSvg = variable.svgRootPath + require('../../assets/file.svg').id;
const prefixCls = 'bsl-upload';
function Upload(props: Props) {
  const { className, disabled, mode, onAddClick, placeholder } = props;
  const target = React.useRef<HTMLInputElement | null>(null);
  const [src, setSrc] = React.useState(props.src || '');
  const onChange = (e: ChangeEvent) => {
    const files = e.target.files;
    e.persist();
    target.current = e.target;

    if (files) {
      const file = files[0];
      if (mode === 'image') {
        compressImg(file, device.width * devicePixelRatio).then((result) => {
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
  let previewRender: JSX.Element | undefined;
  // 默认显示，除非指定false
  if (placeholder !== false) {
    previewRender = mode === 'image' ? (
      <img className={classNames(styles.img, variable.bslComponent, `${prefixCls}-img`)} src={src} data-hide={!src} />
    ) : (
      <Icon
        className={classNames(styles.fileIcon, variable.bslComponent, `${prefixCls}-fileIcon`)}
        src={fileSvg}
        style={{
          display: src ? 'block' : 'none'
        }}
      />
    );
  }
  
  React.useEffect(() => {
    if (props.src !== undefined) {
      setSrc(props.src);
    } else {
      setSrc('');
    }

    if (props.src === '' && target.current) {
      target.current.value = '';
    }
  }, [props.src]);

  return (
    <UploadView
      className={className}
      id={props.id}
      style={props.style}
      src={src}
      process={props.process}
      disabled={disabled}
      placeholder={placeholder}
      onRemove={onRemove}
    >
      <input
        className={classNames(styles.input, `${prefixCls}-input`)}
        type="file"
        onChange={onChange}
        disabled={!!src || disabled}
        //capture={device.system === 'android' ? 'camera' : undefined}
        // accept={mode === 'image' ? 'image/*' : undefined}
        onClick={(e) => {
          const target = e.target as HTMLInputElement;
          if (onAddClick) {
            onAddClick(e);
          }
          target.value = "";
        }}
      />
      {previewRender}
    </UploadView>
  );
}

export default React.memo(Upload, memoAreEqual);
