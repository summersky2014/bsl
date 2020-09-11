import * as React from 'react';
import useRequest from '../../hooks/useRequest';
import BSL from '../../typings';
import Choice from '../Choice';
import Input from '../Input';
import Picker from '../Picker';
import RequestView, { Props as RequestProps } from '../RequestView';
import Textarea from '../Textarea';
import Toast from '../Toast';
/* eslint-disable @typescript-eslint/no-use-before-define */

export interface Props<T> extends BSL.ComponentProps {
  children: JSX.Element | JSX.Element[];
  api?: RequestProps<T>['api'];
  headers?: RequestProps<T>['headers'];
  /** 是否禁用发送请求 */
  disabled?: boolean; 
  data?: RequestProps<T>['data'];
  method?: RequestProps<T>['method'];
  /** 请求成功 */
  onComplete?: RequestProps<T>['onComplete'];
  /** catch时执行 */
  onFail?: RequestProps<T>['onFail'];
  /** onFinally先于onComplete和onFail执行 */
  onFinally?: RequestProps<T>['onFinally'];
  /** onSubmit前段回调，可用于拦截默认的验证逻辑 */
  onSubmitBefore?: () => Promise<boolean>;
  /** onSubmit后段回调，默认验证逻辑执行之后 */
  onSubmit?: () => void;
  /** 提交时，表单有错误内容的提示语
   * @default 请检查提交内容
   */
  toastText?: string;
}

export interface FromTypeProps<Value> {
  onChange: (value: Value, ...args: any[]) => boolean;
  value: Value;
  state: BSL.RequestState;
}

function isMutableRefObject(obj: React.MutableRefObject<any>) {
  if (Object.keys(obj).length === 1 && obj.current) {
    return true;
  }
  return false;
}

const formComponent = [Input, Textarea, Picker, Choice];

function Formtoast(msg: string) {
  if (Form.toast) {
    Form.toast(msg);
  } else {
    Toast.show(msg, 'fail');
  }
}

/**
 * 表单检验，会遍历子组件为表单类型的组件
 * @param children true为检验通过，false为未通过
 */
function formCheck(children: React.ReactElement | React.ReactElement[] , error: { count: number }, toastText = '请检查提交内容'): void {
  React.Children.forEach(children, (child) => {
    for (let i = 0; i < formComponent.length; i++) {
      const type = child.type;

      if (type === formComponent[i]) {
        const props = child.props as FromTypeProps<any>;
        if (props.onChange(props.value) === false) {
          // 只在第一个错误提醒一次
          if (error.count === 0) {
            Formtoast(toastText);
          }
          error.count++;
        }

        break;
      }
    }
    if (child && child.props && child.props.children) {
      formCheck(child.props.children, error, toastText);
    }
  });
}

function Form<T>(props: Props<T>) {
  const { 
    className, id, style, children, onSubmitBefore, onSubmit, api, data, method, onComplete, onFail, onFinally
  } = props;
  const state = React.useRef<BSL.RequestState>('undefined');
  const [request, cancelToken] = useRequest();
  const cancel = React.useCallback(() => cancelToken.current, [cancelToken]);

  React.useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return (
    <form
      className={className}
      id={id}
      style={style}
      onSubmit={async (e) => {
        e.preventDefault();
        const error = { count: 0 };

        if (onSubmitBefore && await onSubmitBefore() === false) {
          return;
        }

        // 表单校验
        formCheck(children, error, props.toastText);

        if (error.count === 0) {
          if (onSubmit) {
            onSubmit();
          }
          if (api && state.current !== 'loading' && props.disabled !== true) {
            state.current = 'loading';
            request({
              api,
              data: isMutableRefObject(data) ? data.current : data,
              method: method || 'post',
              headers: props.headers
            }).then((res) => {
              state.current = 'complete';
              if (onFinally) {
                onFinally();
              }
              if (onComplete) {
                onComplete(res);
              }
              if (RequestView.onAfter) {
                RequestView.onAfter(res);
              }
            }).catch((err) => {
              state.current = 'fail';
              if (onFinally) {
                onFinally();
              }
              if (onFail) {
                onFail(err);
              }
              console.error(err);
            });
          }
        }
      }}
    >
      {children}
    </form>
  );
}

Form.toast = undefined as undefined | ((msg: string) => void);
export default Form;
