import * as React from 'react';
import BSL from '../../typings';
import variable from '../../utils/system/variable';

export interface Props {
  /** 当前的状态类型 */
  state: BSL.RequestState;
  children?: any;
}

interface StateComponentProps {
  children: any;
}

const [CompleteStr, EmptyStr, FailStr, LoadingStr, TimeoutStr, UndefinedStr] = ['Complete', 'Empty', 'Fail', 'Loading', 'Timeout', 'Undefined'];

function SwitchView(props: Props) {
  let render: React.ReactElement<HTMLDivElement, any> | null = null;
  /** 视图数量 */
  const view = React.useMemo(() => {
    return {
      [CompleteStr]: 1,
      [EmptyStr]: 1,
      [FailStr]: 1,
      [LoadingStr]: 1,
      [TimeoutStr]: 1
    };
  }, []);

  const eachChildren = (children: any) => {
    // 根据当前状态赋予对应的视图
    React.Children.forEach(children, (child) => {
      if (render !== null) {
        return;
      }
      const childElement = child as React.ReactElement<HTMLDivElement, any>;
      const type = childElement && childElement.type;
      if (
        (props.state === 'complete' && type && type.displayName === CompleteStr) ||
        (props.state === 'empty' && type && type.displayName === EmptyStr) ||
        (props.state === 'fail' &&  type && type.displayName === FailStr) ||
        (props.state === 'loading' && type && type.displayName === LoadingStr) ||
        (props.state === 'timeout' && type && type.displayName === TimeoutStr) ||
        (props.state === 'undefined' && type && type.displayName === UndefinedStr)
      ) {
        render = childElement;
      }

      if (render === null && childElement && childElement.props && React.Children.count(childElement.props.children)) {
        eachChildren(childElement.props.children);
      }
    });
  };
  // 统计RequestView下的视图数量
  const statisticalView = (children: any) => {
    // 根据当前状态赋予对应的视图
    React.Children.forEach(children, (child) => {
      const childElement = child as React.ReactElement<HTMLDivElement, any>;
      const type = childElement && childElement.type;
      if (
        (type && type.displayName === CompleteStr) ||
        (type && type.displayName === EmptyStr) ||
        (type && type.displayName === FailStr) ||
        (type && type.displayName === LoadingStr) ||
        (type && type.displayName === TimeoutStr)
      ) {
        delete view[type.displayName];
      }

      if (childElement && childElement.props && React.Children.count(childElement.props.children)) {
        statisticalView(childElement.props.children);
      }
    });
  };
  const eachRender = (children: any) => {
    React.Children.forEach(children, (child) => {
      const childElement = child as React.ReactElement<HTMLDivElement, any>;

      if (childElement && childElement.props) {
        if (typeof childElement.props.children === 'function') {
          
          render = (childElement.props.children as () => JSX.Element)();
          return;
        }
        if (React.Children.count(childElement.props.children)) {
          eachRender(childElement.props.children);
        }
      }
    });
  };

  if (props.children) {
    eachChildren(props.children);
    eachRender(render);
    // 如果没有找到对应的视图，就直接渲染children
    if (render === null) {
      render = props.children;
    }
  }

  if (variable.env === 'development') {
    statisticalView(props.children);
    const viewKeys = Object.keys(view);
    // 今有在视图匹配模式下进行提示
    if (render && viewKeys.length < 5) {
      viewKeys.forEach((item) => {
        console.error(`缺少${item}视图，当处于${item}状态时会导致程序错误`);
      });
    }
  }

  return render;
}

function Complete(props: StateComponentProps) {
  return props.children;
}

function Empty(props: StateComponentProps) {
  return props.children;
}

function Fail(props: StateComponentProps) {
  return props.children;
}

function Loading(props: StateComponentProps) {
  return props.children;
}

function Timeout(props: StateComponentProps) {
  return props.children;
}

function Undefined(props: StateComponentProps) {
  return props.children;
}

// 定义Complete状态视图
SwitchView.Complete = Complete;
Complete.displayName = CompleteStr;
// 定义Empty状态视图
SwitchView.Empty = Empty;
Empty.displayName = EmptyStr;
// 定义Fail状态视图
SwitchView.Fail = Fail;
Fail.displayName = FailStr;
// 定义Loading状态视图
SwitchView.Loading = Loading;
Loading.displayName = LoadingStr;
// 定义Timeout状态视图
SwitchView.Timeout = Timeout;
Timeout.displayName = TimeoutStr;
// 定义Undefined状态视图
SwitchView.Undefined = Undefined;
Undefined.displayName = UndefinedStr;

export default SwitchView;