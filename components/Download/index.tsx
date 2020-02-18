import BSL from '../../typings';
import * as React from 'react';
import axios from 'axios';
import memoAreEqual from '../../utils/system/memoAreEqual';

interface Props extends BSL.ComponentProps, DefaultProps {
  src: string;
  children: (process: number, state: BSL.RequestState) => any;
  callback?: (data: any) => void;
  failback?: (err: string) => void;
  finally?: () => void;
}

interface DefaultProps {
  /**
   * @default 'text'
   */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
}

const defaultProps: Required<DefaultProps> = {
  responseType: 'text'
};

function Download(props: Props) {
  const { src, children, callback, failback } = props;
  const [process, setProcess] = React.useState(0);
  const [state, setState] = React.useState<BSL.RequestState>('undefined');
  const cancelToken = React.useRef<(() => void) | null>(null);

  const onFinally = () => {
    if (props.finally) {
      props.finally();
    }
  };
  const onClick = () => {
    if (process >= 100) {
      return;
    }
    setState('loading');
    axios({
      cancelToken: new axios.CancelToken((cancel) => {
        cancelToken.current = () => cancel('cancel');
      }),
      url: src,
      responseType: 'arraybuffer',
      method: 'get',
      onDownloadProgress(progressEvent: ProgressEvent) {
        if (progressEvent.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          setProcess(progressEvent.loaded / progressEvent.total * 100);

          if (progressEvent.loaded >= progressEvent.total) {
            setState('complete');
          }
        }
      }
    }).then((res) => {
      if (res.status === 200 && callback) {
        callback(res.data as ArrayBuffer);
      } else if (failback) {
        failback(res.statusText);
        setState('fail');
      }
      if (onFinally) {
        onFinally();
      }
    }).catch((err: Error) => {
      console.error(err);
      setState('fail');
      if (failback) {
        failback(err.message);
      }
      if (onFinally) {
        onFinally();
      }
    });
  };

  React.useEffect(() => {
    return () => {
      if (cancelToken.current) {
        cancelToken.current();
      }
    };
  }, []);

  return (
    <div
      className={props.className}
      id={props.id}
      style={props.style}
      onClick={onClick}
    >
      {children(process, state)}
    </div>
  );
}

Download.defaultProps = defaultProps;
export default React.memo(Download, memoAreEqual) ;