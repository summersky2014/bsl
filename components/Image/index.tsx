import BSL from '../../typings';
// import * as style from './index.scss';
import * as React from 'react';
import SwitchView, { Type } from '../SwitchView';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import isHttp from '../../utils/isHttp';
import memoAreEqual from '../../utils/memoAreEqual';
import variable from '../../utils/variable';

const imageSvg = variable.svgRootPath + require('./image.svg').id;
interface Props extends BSL.ComponentProps, DefaultProps {
  /** 主机地址 */
  host?: string;
  /** 要加载的图片 */
  src: string;
  /** 只在图片加载成功后会响应 */
  onClick?: BSL.OnClick<HTMLImageElement>;
  /** 图片加载超时时间，默认ImageView.defaultTimeout = 30000 */
  timeout?: number;
}

interface DefaultProps {
  /**  404时显示的图片 */
  emptySrc?: string;
  /** 超时显示视图 */
  timeoutView?: any;
  /** 加载时显示的图片 */
  loadingSrc?: string;
  /** 图片加载失败的图片 */
  failSrc?: string;
}

const defaultProps: Required<DefaultProps> = {
  emptySrc: imageSvg,
  timeoutView: imageSvg,
  loadingSrc: imageSvg,
  failSrc: imageSvg
};

function getSrc(host: string | undefined, src: string): string {
  const realHost = host || ImageView.defaultHost;
  if (src) {
    const url = isHttp(src) ? src : realHost + src;

    return url;
  }

  return '';
}

function ImageView(props: Props) {
  const { src, onClick, emptySrc, timeoutView, loadingSrc, failSrc, host, className, id } = props;
  const [, setRenderId] = React.useState<Type>('undefined');
  const state = React.useRef<Type>('undefined');
  const elemRef = React.createRef<HTMLDivElement>();
  const [setTimeOut, clearTimeOut] = useTimeout();
  const timeout = props.timeout ? props.timeout : ImageView.defaultTimeout;
  const timeoutTimer = React.useRef<ListenerCallback>();
  const loadingTimer = React.useRef<ListenerCallback>();
  const imageObj = React.useMemo(() => new Image(0, 0), []);
  const setState = (newSstate: Type) => {
    state.current = newSstate;
    setRenderId(newSstate);
  };
  const onLoad = () => {
    setState('complete');
    clearTimeOut(timeoutTimer.current!);
  };
  // 图片加载失败时，统一处理为404的情况
  const onError = (e: ErrorEvent) => {
    setState('fail');
    clearTimeOut(timeoutTimer.current!);
  };
  const timeoutRender = () => {
    if (timeoutView) {
      return (
        <div onClick={() => imageObj.src = src}>
          {timeoutView}
        </div>
      );
    } else {
      return <img className={className} src={loadingSrc} />;
    }
  };

  useIntersectionObserver(elemRef, () => {
    imageObj.src = getSrc(host, src);
    loadingTimer.current = setTimeOut(() => {
      if (state.current === 'undefined') {
        state.current = 'loading';
        setState('loading');
      }
    }, 300);
    timeoutTimer.current = setTimeOut(() => {
      if (state.current === 'loading') {
        state.current = 'timeout';
        setState('timeout');
      }
    }, timeout);

    imageObj.addEventListener('load', onLoad);
    imageObj.addEventListener('error', onError);
  });

  React.useEffect(() => {
    return () => {
      if (timeoutTimer.current) {
        clearTimeOut(timeoutTimer.current);
      }
      if (loadingTimer.current) {
        clearTimeOut(loadingTimer.current);
      }
      imageObj.removeEventListener('error', onError);
      imageObj.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <SwitchView state={state.current}>
      <SwitchView.Complete>
        <img className={className} id={id} style={props.style} data-state="complete" src={src} onClick={onClick} />
      </SwitchView.Complete>
      <SwitchView.Empty>
        <img className={className} id={id} style={props.style} data-state="empty" src={emptySrc} />
      </SwitchView.Empty>
      <SwitchView.Loading>
        <img className={className} id={id} style={props.style} data-state="loading" src={loadingSrc} />
      </SwitchView.Loading>
      <SwitchView.Fail>
        <img className={className} id={id} style={props.style} data-state="fail" src={failSrc} />
      </SwitchView.Fail>
      <SwitchView.Timeout>
        {timeoutRender()}
      </SwitchView.Timeout>
      <SwitchView.Undefined>
        <div className={className} ref={elemRef} />
      </SwitchView.Undefined>
    </SwitchView>
  );
}

ImageView.defaultHost = '';
ImageView.defaultTimeout = 30000;
ImageView.defaultProps = defaultProps;

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return memoAreEqual(prevProps, nextProps);
}

export { ImageView };
export default React.memo(ImageView, areEqual);
