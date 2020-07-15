import { css } from 'aphrodite/no-important';
import * as classNames from 'classnames';
import * as React from 'react';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import BSL from '../../typings';
import variable from '../../utils/system/variable';
import RequestView, { Props as RequestProps } from '../RequestView';
import styles from './style';

type State = 'loading' | 'empty' | 'over' | 'fail' | '';
interface Props extends BSL.ComponentProps, RequestProps {
  /** 分页大小 */
  pageSize: number;
  /** 滚动到底时触发 */
  onLoader: () => Promise<void>;
  /** 加载状态容器的样式名 */
  loaderCls?: string;
  /** 加载完成的样式名 */
  overCls?: string;
  /** 加载失败的样式名 */
  failCls?: string;
  /** 加载中样式名  */
  loadingCls?: string;
  /** 默认：正在加载中... */
  loadingText?: string;
  /** 默认：已经加载到底了 */
  overText?: string;
  /** 源数据长度 */
  sourceDataLength: number;
  onCompleteRender: any;
  onEmptyRender?: any;
  onFailRender?: any;
  onLoadingRender?: any;
  onTimeoutRender?: any;
}

interface DefaultProps extends Pick<RequestProps, 'refreshId'> {
}

const defaultProps: DefaultProps = {
  refreshId: 0
};

const prefixCls = 'bsl-scrollLoader';
function ScrollLoader(props: Props) {
  const { id, loadingText, overText, onLoader, loadingCls, overCls, failCls } = props;
  const elemRef = React.useRef<HTMLDivElement>(null);
  const loaderComplete = React.useRef<boolean | null>(null);
  const loaderState = React.useRef<State>('');
  const listenerCallback = React.useRef<ListenerCallback>();
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const [state, setState] = React.useState<State>(loaderState.current);
  const [loaderRefreshId, setLoaderRefreshId] = React.useState(0);
  const isSourceDataEmpty = props.sourceDataLength === 0;
  const updateState = (newState: State) => {
    loaderState.current = newState;
    setState(newState);
  };
  const loaderRender = () => {
    switch (state) {
      case '':
        return null;
      case 'loading':
        return <div className={loadingCls}>{loadingText || '正在加载中...'}</div>;
      case 'over':
        return <div className={overCls}>{overText || '已经加载到底了'}</div>;
      case 'fail':
        return (
          <div 
            className={failCls}
            onClick={() => setLoaderRefreshId(loaderRefreshId + 1)}
          >加载失败，点击重新加载</div>
        );
      default:
        return null;
    }
  };

  useIntersectionObserver(elemRef, () => {
    if (loaderComplete.current !== true && (loaderState.current === 'loading' || loaderState.current === '')) {
      loaderComplete.current = true;
      updateState('loading');

      listenerCallback.current = setTimeOut(() => {
        onLoader().then(() => {
          loaderComplete.current = false;
        });
      }, 500);
    }
  }, {
    once: false,
    USE_MUTATION_OBSERVER: false
  });

  React.useEffect(() => {
    return () => {
      if (listenerCallback.current) {
        clearTimeOut(listenerCallback.current);
      }
    };
  }, [clearTimeOut]);

  React.useEffect(() => {
    updateState(props.sourceDataLength % props.pageSize !== 0 && props.sourceDataLength !== 0 ? 'over' : '');
  }, [props.pageSize, props.sourceDataLength]);

  return (
    <React.Fragment>
      <RequestView
        {...props}
        className={classNames(prefixCls, props.className)}
        refreshId={loaderRefreshId + props.refreshId}
        onComplete={(res: BSL.RequestResponse<any[]>) => {
          updateState('');
          if (props.onComplete) {
            props.onComplete(res);
          }
        }}
        onEmpty={(res: BSL.RequestResponse<any[]>) => {
          updateState(isSourceDataEmpty ? 'empty' : 'over');
          if (props.onEmpty) {
            props.onEmpty(res);
          }
        }}
        onFail={(err) => {
          updateState('fail');
          if (props.onFail) {
            props.onFail(err);
          }
        }}
      >
        {() => (
          <React.Fragment>
            <RequestView.Complete>
              {props.onCompleteRender}
            </RequestView.Complete>
            <RequestView.Loading>
              {props.onLoadingRender && isSourceDataEmpty ? props.onLoadingRender : null}
            </RequestView.Loading>
            <RequestView.Empty>
              {props.onEmptyRender && state === 'empty' ? props.onEmptyRender : props.onCompleteRender}
            </RequestView.Empty>
            <RequestView.Fail>
              {props.onFailRender && state === 'fail' ? props.onFailRender : props.onCompleteRender}
            </RequestView.Fail>
            <RequestView.Timeout>
              {props.onTimeoutRender && isSourceDataEmpty ? props.onTimeoutRender : props.onCompleteRender}
            </RequestView.Timeout>
          </React.Fragment>
        )}
      </RequestView>
      <div
        className={classNames(css(styles.root), props.loaderCls, variable.bslComponent)}
        id={id}
        style={props.style}
        ref={elemRef}
        data-hide={isSourceDataEmpty}
      >{loaderRender()}</div>
    </React.Fragment>
  );
}

ScrollLoader.defaultProps = defaultProps;
export default ScrollLoader;
