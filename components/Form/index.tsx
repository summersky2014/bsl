import BSL from '../../typings';
import * as React from 'react';
import Toast from '../Toast';
import { Type } from '../SwitchView';
import Input from '../Input';
import Picker from '../Picker';
import Choice from '../Choice';
import { Props as RequestProps } from '../RequestView';
import anyuseRequest from '../../hooks/anyuseRequest';

export interface Props extends BSL.ComponentProps {
  api?: RequestProps['api'];
  data?: RequestProps['data'];
  method?: RequestProps['method'];
  /** 请求成功 */
  onComplete?: RequestProps['onComplete'];
  /** catch时执行 */
  onFail?: RequestProps['onFail'];
  /** onFinally先于onComplete和onFail执行 */
  onFinally?: RequestProps['onFinally'];
  children: JSX.Element | JSX.Element[];
  /** onSubmit前段回调，可用于拦截默认的验证逻辑 */
  onSubmitBefore?: () => boolean;
  /** onSubmit后段回调，默认验证逻辑执行之后 */
  onSubmit?: () => void;
}

export interface FromTypeProps<Value> {
  onChange: (value: Value, ...args: any[]) => boolean;
  value: Value;
  state: Type;
}

const formComponent = [Input, Picker, Choice];

/**
 * 表单检验，会遍历子组件为表单类型的组件
 * @param children true为检验通过，false为未通过
 */
function formCheck(children: React.ReactElement | React.ReactElement[] , error: { count: number }): void {
  React.Children.forEach(children, (child) => {
    for (let i = 0; i < formComponent.length; i++) {
      const type = child.type;
      if (type === formComponent[i]) {
        const props = child.props as FromTypeProps<any>;
        if (props.onChange(props.value) === false) {
          // 只在第一个错误提醒一次
          if (error.count === 0) {
            Toast.show('请检查提交内容', 'fail');
          }
          error.count++;
        }

        break;
      }
    }
    if (child && child.props && child.props.children) {
      formCheck(child.props.children, error);
    }
  });
}

function Form(props: Props) {
  const { className, id, style, children, onSubmitBefore, onSubmit, api, data, method, onComplete, onFail, onFinally } = props;
  const [request, cancelToken] = anyuseRequest();

  React.useEffect(() => {
    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
  }, []);

  return (
    <form
      className={className}
      id={id}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        const error = { count: 0 };

        if (onSubmitBefore && onSubmitBefore() === false) {
          return;
        }

        // 表单校验
        formCheck(children, error);

        if (error.count === 0) {
          if (onSubmit) {
            onSubmit();
          }
          if (api) {
            request({
              api,
              data,
              method
            }).then((res) => {
              if (onFinally) {
                onFinally();
              }
              if (onComplete) {
                onComplete(res);
              }
            }).catch((err) => {
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

export default Form;
