import BSL from '../../typings';
import * as React from 'react';
import { appData } from '../../app/core';
import { ListenerCallback } from '../../app/Scheduler';
import SwtichView from '../SwitchView';
import anyuseRequest, { Option as RequestOption } from '../../hooks/anyuseRequest';
import anyuseTimeout from '../../hooks/anyuseTimeout';

export interface Props extends RequestOption, BSL.ComponentProps, DefaultProps {
  children?: (data: any) => any;
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
  onFail?: (error?: Error) => void;
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
  const [request, cancelToken, clearCache] = anyuseRequest();
  /** 重试接口时，遇到相同状态不会重新render，dataId保证能正确执行render */
  const [, setDataId] = React.useState(0);
  /** 用于重试接口，触发useEffect */
  const [retryId, setRetryId] = React.useState(0);
  const responseData = React.useRef<any>();
  const typeRef = React.useRef<BSL.RequestState>('undefined');
  const paramsStr = JSON.stringify(params);
  const dataStr = JSON.stringify(data);
  const initRoute = appData.currentPageId;
  const timer = React.useRef<ListenerCallback | null>();
  const prevRefreshId = React.useRef(refreshId);
  let cacheKey: string | undefined;
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

      if (RequestView.onAfter) {
        RequestView.onAfter(res);
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
      } else {
        setType('fail');
        throw err;
      }
    });
    return () => {
      if (cache === 'page' && cacheKey && initRoute !== appData.currentPageId) {
        clearCache(cacheKey);
      }
  
      if (cancelToken.current) {
        cancelToken.current();
      }

      if (timer.current) {
        clearTimeOut(timer.current);
      }
    };
  }, [api, paramsStr, dataStr, refreshId, retryId, disiabled]);

  return children ? (
    <div
      className={props.className}
      id={props.id}
      style={props.style}
      onClick={onRetry}
    >
      {typeRef.current !== 'undefined' ? (
        <SwtichView state={typeRef.current}>
          {children(responseData.current)}
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

export default RequestView;
