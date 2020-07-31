import * as React from 'react';
import { appData } from '../../app/core';
import { ListenerCallback } from '../../app/Scheduler';
import anyuseTimeout from '../../hooks/anyuseTimeout';
import useRequest, { Option as RequestOption } from '../../hooks/useRequest';
import BSL from '../../typings';
import SwtichView from '../SwitchView';

export interface Props extends RequestOption, BSL.ComponentProps, DefaultProps {
  children?: (data: any, code: BSL.ResponseCode) => any;
  /** 用于刷新接口， 触发useEffect */
  refreshId?: any;
  /** 是否禁用 */
  disiabled?: boolean;
  /** 只处于loading视图状态下时才触发 */
  onLoading?: () => void;
  /** 请求成功 */
  onComplete?: (response: BSL.RequestResponse<any>) => void;
  /** 请求成功，但数据为空 */
  onEmpty?: (response: BSL.RequestResponse<any>) => void;
  /** catch时执行 */
  onFail?: (response: Error | BSL.RequestResponse<any>) => void;
  /** 未登录时的回调 */
  onNotLogin?: (response: BSL.RequestResponse<any>) => void;
  /** onFinally先于onComplete和onFail执行 */
  onFinally?: (response?: BSL.RequestResponse<any>) => void;
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
function RequestView(props: Props) {
  const {
    api, children, cache, params, data, refreshId, onComplete, onFail, onFinally, onEmpty, onLoading, disiabled
  } = props;
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const [request, cancelToken, clearCache] = useRequest();
  /** 重试接口时，遇到相同状态不会重新render，dataId保证能正确执行render */
  const [, setDataId] = React.useState(0);
  /** 用于重试接口，触发useEffect */
  const [retryId, setRetryId] = React.useState(0);
  const responseData = React.useRef<any>();
  const responseCode = React.useRef<BSL.ResponseCode>();
  const typeRef = React.useRef<BSL.RequestState>('undefined');
  const paramsStr = JSON.stringify(params);
  const dataStr = JSON.stringify(data);
  const initRoute = appData.currentPageId;
  const timer = React.useRef<ListenerCallback | null>();
  const prevRefreshId = React.useRef(refreshId);
  const cacheKey = React.useRef<string>('');
  const setType = (typeValue: BSL.RequestState, res?: any) => {
    typeRef.current = typeValue;
    responseData.current = res;

    if (timer.current) {
      clearTimeOut(timer.current);
      timer.current = null;
    }
    setDataId(Date.now());
  };

  const onRetry = () => {
    if ((typeRef.current === 'fail' || typeRef.current === 'timeout') && props.useRetry) {
      typeRef.current = 'undefined';
      setRetryId(retryId + 1);
    }
  };

  React.useEffect(() => {
    if (disiabled) {
      return;
    }
    timer.current = setTimeOut(() => {
      if (typeRef.current === 'undefined' || prevRefreshId.current !== refreshId) {
        setType('loading');
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
          setType('complete', res.data);
          if (onComplete) {
            onComplete(res);
          }
          break;
        case 401:
          setType('fail', res.data);
          if (props.onNotLogin) {
            props.onNotLogin(res);
          }
          break;
        case 404:
          setType('empty', res.data);
          if (onEmpty) {
            onEmpty(res);
          }
          break;
        default:
          // 500或其他码都视为fail状态
          setType('fail');
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
      if (onFail) {
        onFail(err);
      }
      if (err.message.includes('timeout of') && err.message.includes('ms exceeded')) {
        setType('timeout');
      } else {
        setType('fail');
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
      {typeRef.current !== 'undefined' ? (
        <SwtichView state={typeRef.current}>
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
