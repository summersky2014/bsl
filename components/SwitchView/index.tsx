import * as React from 'react';

/** 状态类型 */
export type Type = 'complete' | 'empty' | 'fail'  | 'loading' | 'timeout' | 'undefined';
export interface Props {
  /** 当前的状态类型 */
  state: Type;
  children?: any;
}

interface StateComponentProps {
  children: any;
}

// tslint:disable-next-line: max-line-length
const [CompleteStr, EmptyStr, FailStr, LoadingStr, TimeoutStr, UndefinedStr] = ['Complete', 'Empty', 'Fail', 'Loading', 'Timeout', 'Undefined'];

function SwitchView(props: Props) {
  let render: React.ReactElement<HTMLDivElement, any> | null = null;

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
  const eachRender = (children: any) => {
    React.Children.forEach(children, (child) => {
      const childElement = child as React.ReactElement<HTMLDivElement, any>;
      console.log(childElement);

      if (childElement && childElement.props) {
        if (typeof childElement.props.children === 'function') {
          // @ts-ignore
          render = childElement.props.children();
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