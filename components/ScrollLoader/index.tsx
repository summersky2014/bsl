import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import anyuseTimeout, { ListenerCallback } from '../../hooks/anyuseTimeout';
import RequestView, { Props as RequestProps } from '../RequestView';
import './index.scss';

type State = 'loading' | 'empty' | 'over' | 'fail' | '';
interface Props extends BSL.ComponentProps, RequestProps {
  /** 分页大小 */
  pageSize: number;
  /** 滚动到底时触发 */
  onLoader: () => Promise<void>;
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

const prefixCls = 'bsl-scrollloader';
const defaultProps: DefaultProps = {
  refreshId: 0
};

function ScrollLoader(props: Props) {
  const { className, id, loadingText, overText, onLoader } = props;
  const elemRef = React.createRef<HTMLDivElement>();
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
        return <div></div>;
      case 'loading':
        return <div>{loadingText || '正在加载中...'}</div>;
      case 'over':
        return <div>{overText || '已经加载到底了'}</div>;
      case 'fail':
        return <div onClick={() => setLoaderRefreshId(loaderRefreshId + 1)}>加载失败，点击重新加载</div>;
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
  }, []);

  // React.useEffect(() => {
  //   updateState(props.sourceDataLength % props.pageSize !== 0 && props.sourceDataLength !== 0 ? 'over' : 'loading');
  // }, [props.sourceDataLength]);

  return (
    <React.Fragment>
      <RequestView
        {...props}
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
        className={classNames(prefixCls, className, 'bsl_component')}
        id={id}
        style={props.style}
        ref={elemRef}
        data-hide={isSourceDataEmpty}
      >
        {loaderRender()}
      </div>
    </React.Fragment>
  );
}

ScrollLoader.defaultProps = defaultProps;
export default ScrollLoader;
