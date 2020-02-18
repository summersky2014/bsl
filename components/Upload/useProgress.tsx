import BSL from '../../typings';
import axios, { Canceler, AxiosRequestConfig } from 'axios';
import isHttp from '../../utils/is/isHttp';
interface OnUploadProgress extends AxiosRequestConfig {
  api: string;
  /** 上传成功 */
  onComplete: (res: BSL.RequestResponse<any>) => void;
  /**
   * 上传异常,还未到服务器返回阶段/
   * 上传失败，服务器状态码返回非200
   */
  onFail?: (res: Error) => void;
  /** 上传成功或失败都会执行 */
  onFinally?: () => void;
  /**
   * 上传过程中的回调
   * @param process 进度百分比
   */
  onUploadProgress?: (process: number) => void;
}

function UploadProgress(): [(config: OnUploadProgress) => void, (() => void) | null] {
  let cancelToken: Canceler | null = null;

  const onUploadProgress = (config: OnUploadProgress) => {
    const { api, onComplete, onFail } = config;
    const onFinally = () => {
      if (config.onFinally) {
        config.onFinally();
      }
    };

    axios({
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      cancelToken: new axios.CancelToken((cancel) => {
        cancelToken = cancel;
      }),
      url: isHttp(api) ? api : axios.defaults.baseURL + api,
      method: 'post',
      onUploadProgress(progressEvent: ProgressEvent) {
        if (progressEvent.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          if (config.onUploadProgress) {
            config.onUploadProgress(progressEvent.loaded / progressEvent.total * 100);
          }
        }
      }
    }).then((response: any) => {
      const res = response as BSL.RequestResponse<any>;
      if (onFinally) {
        onFinally();
      }
      onComplete(res.data);
    }).catch((err: Error) => {
      console.error(err);
      if (onFinally) {
        onFinally();
      }
      if (onFail) {
        onFail(err);
      }
    });
  };

  return [onUploadProgress, cancelToken];
}

export default UploadProgress;