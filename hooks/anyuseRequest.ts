import BSL from '../typings';
import axios, { AxiosRequestConfig, Canceler, Method } from 'axios';
import RequestView from '../components/RequestView';

type Omit<A, B extends keyof A, C extends keyof A> = Pick<A, ({
  [K in keyof A]: K
} & {
  [K in B]: never
} & {
  [K in C]: never
})[keyof A]>;

export interface Option extends Omit<AxiosRequestConfig, 'url', 'method'> {
  /** 请求接口的名称 */
  api: string;
  /**
   * app: 整个应用生命周期内缓存
   * page: 页面生命周期内缓存
   */
  cache?: 'app' | 'page';
  /**
   * @default 'GET'
   */
  method?: Method;
}

export const cacheData: Map<string, any> = new Map();

function useRequest(): [(option: Option) => Promise<BSL.RequestResponse>, Canceler | null, (key: string) => void] {
  const clearCache = (key: string) => cacheData.delete(key);
  let cancelToken: (() => void) | null = null;
  const request = (option: Option): Promise<BSL.RequestResponse> => {
    return new Promise((resolve, reject) => {
      const { api } = option;
      const urlSearchParams = new URLSearchParams();
      const createKey = () => JSON.stringify({ api: option.api, params: option.params, data: option.data });
      const method = (option.method || (axios.defaults.method && axios.defaults.method.toLocaleUpperCase())) as Method;
      const defualtData = RequestView.defaultData;

      // 判断是否有缓存
      if (option.cache) {
        const key = createKey();
        if (cacheData.has(key)) {
          const response: BSL.RequestResponse = {
            data: cacheData.get(key),
            code: 200,
            msg: ''
          };
          resolve(response);
          return;
        }
      }

      if (defualtData && method === 'POST') {
        Object.keys((defualtData)).forEach((key) => {
          urlSearchParams.append(key, defualtData[key]);
        });

      }

      // 去除object中值为undefined的字段
      if (option.data) {
        Object.keys((option.data)).forEach((key) => {
          if (option.data[key] !== undefined) {
            urlSearchParams.append(key, option.data[key]);
          }
        });
      }

      axios({
        ...option,
        data: urlSearchParams,
        url: api,
        method,
        cancelToken: new axios.CancelToken((cancel) => {
          cancelToken = () => cancel('cancel');
        })
      }).then((res) => {
        if (res.status === 200) {
          let key: string | undefined ;
          // 判断接口是否需要缓存，并将结果储存起来
          if (option.cache) {
            key = createKey();
            cacheData.set(key, res.data);
          }
          resolve({
            ...res.data,
            key
          });
        } else {
          const response: BSL.RequestResponse = {
            data: null,
            code: 500,
            msg: '网络错误'
          };
          resolve(response);
        }
      }).catch((err: Error) => {
        reject(err);
      });
    });
  };

  return [request, cancelToken, clearCache];
}

export default useRequest;