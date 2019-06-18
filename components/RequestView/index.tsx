import BSL from '../../typings';
import * as React from 'react';
import { appData } from '../../app/core';
import { ListenerCallback } from '../../app/Scheduler';
import SwtichView, { Type } from '../SwitchView';
import anyuseRequest, { Option as RequestOption } from '../../hooks/anyuseRequest';
import anyuseTimeout from '../../hooks/anyuseTimeout';

export interface Props extends RequestOption, BSL.ComponentProps {
  children?: (data: any) => any;
  /** 用于刷新接口， 触发useEffect */
  refreshId?: any;
  /** 请求成功 */
  onComplete?: (response: BSL.RequestResponse) => void;
  /** 请求成功，但数据为空 */
  onEmpty?: (response: BSL.RequestResponse) => void;
  /** catch时执行 */
  onFail?: (error?: Error) => void;
  /** onFinally先于onComplete和onFail执行 */
  onFinally?: (response?: BSL.RequestResponse) => void;
}

function RequestView(props: Props) {
  const { api, children, cache, params, data, refreshId, onComplete, onFail, onFinally, onEmpty } = props;
  const [setTimeOut, clearTimeOut] = anyuseTimeout();
  const [request, cancelToken, clearCache] = anyuseRequest();
  const [, setTypeState] = React.useState<Type>('undefined');
  /** 用于重试接口，触发useEffect */
  const [retryId, setRetryId] = React.useState(0);
  const [responseData, setResponseData] = React.useState<any>();
  const typeRef = React.useRef<Type>('undefined');
  const paramsStr = JSON.stringify(params);
  const dataStr = JSON.stringify(data);
  const initRoute = appData.currentPageId;
  const timer = React.useRef<ListenerCallback | null>();
  let cacheKey: string | undefined;
  const setType = (typeValue: Type, res?: any) => {
    typeRef.current = typeValue;

    if (timer.current) {
      clearTimeOut(timer.current);
      timer.current = null;
    }

    setResponseData(res);
    setTypeState(typeValue);
  };

  const onRetry = () => {
    if (typeRef.current === 'fail' || typeRef.current === 'timeout') {
      typeRef.current = 'undefined';
      setRetryId(retryId + 1);
    }
  };

  React.useEffect(() => {
    timer.current = setTimeOut(() => {
      if (typeRef.current === 'undefined') {
        setType('loading');
      }
    }, 300);
    request(props).then((res) => {
      cacheKey = res.cacheKey;

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
            onFail();
          }
          break;
      }
    }).catch((err: Error) => {
      if (onFinally) {
        onFinally();
      }
      if (onFail) {
        onFail(err);
      }
      if (err.message.includes('timeout of') && err.message.includes('ms exceeded')) {
        setType('timeout');
      } else if (err.message === 'Network Error') {
        setType('fail');
      } else {
        throw err;
      }
    });
    return () => {
      if (cache === 'page' && cacheKey && initRoute !== appData.currentPageId) {
        clearCache(cacheKey);
      }

      if (cancelToken) {
        cancelToken();
      }

      if (timer.current) {
        clearTimeOut(timer.current);
      }
    };
  }, [api, paramsStr, dataStr, refreshId, retryId]);

  return children ? (
    <div
      className={props.className}
      id={props.id}
      style={props.style}
      onClick={onRetry}
    >
      {typeRef.current !== 'undefined' ? (
        <SwtichView state={typeRef.current}>
          {children(responseData)}
        </SwtichView>
      ) : null}
    </div>
  ) : null;
}

RequestView.Complete = SwtichView.Complete;
RequestView.Empty = SwtichView.Empty;
RequestView.Fail = SwtichView.Fail;
RequestView.Loading = SwtichView.Loading;
RequestView.Timeout = SwtichView.Timeout;
/** axios.defaults.data */
RequestView.defaultData = null as null | Record<string, any>;

export default RequestView;
