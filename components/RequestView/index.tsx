import * as React from 'react';
import { appData } from '../../app/core';
import { ListenerCallback } from '../../app/Scheduler';
import anyuseTimeout from '../../hooks/anyuseTimeout';
import useRequest, { Option as RequestOption } from '../../hooks/useRequest';
import BSL from '../../typings';
import SwtichView from '../SwitchView';

export interface Props<T> extends RequestOption, BSL.ComponentProps, DefaultProps {
  children?: (data: T, code: BSL.ResponseCode) => any;
  /** 用于刷新接口， 触发useEffect */
  refreshId?: any;
  /** 是否禁用 */
  disiabled?: boolean;
  /** 只处于loading视图状态下时才触发 */
  onLoading?: () => void;
  /** 请求成功 */
  onComplete?: (response: BSL.RequestResponse<T>) => void;
  /** 请求成功，但数据为空 */
  onEmpty?: (response: BSL.RequestResponse<T>) => void;
  /** code为500时执行 */
  onFail?: (response: BSL.RequestResponse<T>) => void;
  /** catch时执行 */
  onCatch?: (err: Error) => void;
  /** 未登录时的回调 */
  onNotLogin?: (response: BSL.RequestResponse<T>) => void;
  /** onFinally先于onComplete和onFail执行 */
  onFinally?: (response?: BSL.RequestResponse<T>) => void;
}

interface DefaultProps {
  /** 
   * 是否使用失败视图和超时视图的点击重试功能
   * @default true
   */
  useRetry?: boolean;
}

const defaultProps: Required<DefaultProps> = {
  useRetry: true
};
function RequestView<T>(props: Props<T>) {
  const {
    api, children, cache, params, data, refreshId, onComplete, onFail, onFinally, onEmpty, onLoading, disiabled, onCatch
  } = props;
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const [request, cancelToken, clearCache] = useRequest();
  /** 重试接口时，遇到相同状态不会重新render，dataId保证能正确执行render */
  const [, setDataId] = React.useState(0);
  /** 用于重试接口，触发useEffect */
  const [retryId, setRetryId] = React.useState(0);
  const responseData = React.useRef<any>();
  const responseCode = React.useRef<BSL.ResponseCode>();
  const state = React.useRef<BSL.RequestState>('undefined');
  const paramsStr = JSON.stringify(params);
  const dataStr = JSON.stringify(data);
  const initRoute = appData.currentPageId;
  const timer = React.useRef<ListenerCallback | null>();
  const prevRefreshId = React.useRef(refreshId);
  const cacheKey = React.useRef<string>('');
  const setState = (typeValue: BSL.RequestState, res?: any) => {
    state.current = typeValue;
    responseData.current = res;

    if (timer.current) {
      clearTimeOut(timer.current);
      timer.current = null;
    }
    setDataId(Date.now());
  };

  const onRetry = () => {
    if ((state.current === 'fail' || state.current === 'timeout') && props.useRetry) {
      state.current = 'undefined';
      setRetryId(retryId + 1);
    }
  };

  React.useEffect(() => {
    if (disiabled) {
      return;
    }
    timer.current = setTimeOut(() => {
      if (state.current === 'undefined' || prevRefreshId.current !== refreshId) {
        setState('loading');
        if (onLoading) {
          onLoading();
        }
      }
    }, 300);
    request(props).then((res) => {
      cacheKey.current = res.cacheKey || '';
      responseCode.current = res.code;
      if (onFinally) {
        onFinally(res);
      }  
      switch (res.code) {
        case 200:
          setState('complete', res.data);
          if (onComplete) {
            onComplete(res);
          }
          break;
        case 401:
          setState('fail', res.data);
          if (props.onNotLogin) {
            props.onNotLogin(res);
          }
          break;
        case 404:
          setState('empty', res.data);
          if (onEmpty) {
            onEmpty(res);
          }
          break;
        default:
          // 500或其他码都视为fail状态
          setState('fail');
          if (onFail) {
            onFail(res);
          }
          break;
      }

      if (RequestView.onAfter) {
        RequestView.onAfter(res);
      }
    }).catch((err: Error) => {
      if (err.message === 'cancel') {
        return;
      }

      if (onFinally) {
        onFinally();
      }
      if (onCatch) {
        onCatch(err);
      }
      if (err.message.includes('timeout of') && err.message.includes('ms exceeded')) {
        setState('timeout');
      } else {
        setState('fail');
        throw err;
      }
    });
    return () => {
      if (cache === 'page' && cacheKey.current && initRoute !== appData.currentPageId) {
        clearCache(cacheKey.current);
      }
      
      if (cancelToken.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cancelToken.current();
      }

      if (timer.current) {
        clearTimeOut(timer.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, paramsStr, dataStr, refreshId, retryId, disiabled, cache]);

  return children ? (
    <div
      className={props.className}
      id={props.id}
      style={props.style}
      onClick={onRetry}
    >
      {state.current !== 'undefined' ? (
        <SwtichView state={state.current}>
          {children(responseData.current, responseCode.current!)}
        </SwtichView>
      ) : null}
    </div>
  ) : null;
}

RequestView.defaultProps = defaultProps;
RequestView.Complete = SwtichView.Complete;
RequestView.Empty = SwtichView.Empty;
RequestView.Fail = SwtichView.Fail;
RequestView.Loading = SwtichView.Loading;
RequestView.Timeout = SwtichView.Timeout;
/** axios.defaults.data */
RequestView.defaultData = null as null | Record<string, any>;
/** 请求响应中最末端执行 */
RequestView.onAfter = undefined as ((res: BSL.RequestResponse<any>) => void) | undefined;

const LoadingState = RequestView.Loading;
const EmptyState = RequestView.Empty;
const FailState = RequestView.Fail;
const CompleteState = RequestView.Complete;
const TimeoutState = RequestView.Timeout;

export { LoadingState, EmptyState, FailState, CompleteState, TimeoutState };
export default RequestView;
