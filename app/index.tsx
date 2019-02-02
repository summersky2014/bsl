import BSL from '../typings';
import * as React from 'react';
import { History } from 'history';
import { withRouter } from 'react-router-dom';
import Page from './PageComponent';
import global from '../../app/global';
import Toast from '../Toast';
import { other } from '../../utils/env';
// import './index.scss';

type PageType = Page<BSL.PageProps<any>, any, any>;

interface BaseProps {
  /** 路由改变时触发 */
  onRouteChange?: (pathname: string) => void;
}

// withRouter提供dreact-router的porps
export interface Props extends BaseProps, BSL.PageProps<any> {
  history: History;
}

interface State {
  /** 当前匹配的路由 */
  route: JSX.Element[];
  lastPathname: string;
}

// 对route中返回的page element手动创建
function getRoute(nextProps: Props): JSX.Element {
  global.pageId++;
  return React.createElement(global.appRoute as () => JSX.Element, { key: global.pageId, location: nextProps.location });
}

// function getPageStackInAppRoute(nextProps: Props): PageType {
//   const route = switchRouter(nextProps.routes, nextProps.location.pathname) as React.ReactElement<SwitchRouterProps>;

//   if (!route) {
//     console.error('路由解析失败，请检查路由映射或url是否正确');
//   }

//   return route.props.component;
// }

// 获取上一个页面的类声明
export function getPrevPageClass(prevCount: number): PageType | undefined {
  return App.component[App.component.length - prevCount];
}

/** 是否是replace动作 */
function isReplaceAction(nextProps: Props): boolean {
  const action = nextProps.history.action;
  const isReplace = action === 'REPLACE';

  return isReplace;
}

/** 获取页面的pageRef静态属性 */
// function getPageRootElemRef(page: PageType | undefined): HTMLElement | null {
//   if (page) {
//     const pageRootElemRef = page.pageRootElemRef;

//     if (pageRootElemRef === undefined) {
//       console.warn('页面组件中pageRef不存在，请检查setPageRef是否正确调用');
//     }

//     return pageRootElemRef.current;
//   }

//   return null;
// }

export function push(nextProps: Props): void {
  onPush(nextProps);
  window.scrollTo(0, 0);
}

function pop(nextProps: Props): void {
  const top = App.scrollLocation[App.scrollLocation.length - 1];

  if (App.component.length) {
    onPop(nextProps);
  }

  App.component.pop();
  App.scrollLocation.pop();
  global.pageId--;
  window.scrollTo(0, top);
}

function onPush(nextProps: Props): void {
  const currentComponent = getPrevPageClass(2);
  const toComponent = getPrevPageClass(1);
  // const pageRef = getPageRootElemRef(currentComponent);

  // 上一个页面的离开事件
  if (currentComponent && currentComponent.pageLeave) {
    currentComponent.pageLeave();
  }

  // 排除第一次初始化时调用，这个方法应该在离开页面时调用
  if (App.component.length > 1 && isReplaceAction(nextProps) === false) {
    onPageLeave(currentComponent, toComponent, 'enter');
  }

  // if (pageRef) {
  //   pageRef.style.display = 'none';
  // }
}

function onPop(nextProps: Props): void {
  if (isReplaceAction(nextProps)) {
    return;
  }

  const currentComponent = getPrevPageClass(1);
  const toComponent = getPrevPageClass(2);
  // const pageRef = getPageRootElemRef(toComponent);

  // 目标页面的进入事件
  if (toComponent && toComponent.pageEnter) {
    toComponent.pageEnter();
    // 后退回页面时，让hasSend初始化
    toComponent.behavior.postAction.hasSend = false;
    // 后退回页面时，重置进入时间
    toComponent.entrytime = Date.now();
  }

  onPageLeave(currentComponent, toComponent, 'exit');
  // if (pageRef) {
  //   pageRef.style.display = 'block';
  // }
}

export function onPageLeave(currentComponent: PageType | undefined, toComponent: PageType | undefined, type: 'enter' | 'exit'): void {
  if ((currentComponent && currentComponent.pageName) && (toComponent && toComponent.pageName)) {
    pageLeave({
      behavior: currentComponent.behavior,
      type,
      now: currentComponent.pageName,
      to: toComponent.pageName || '',
      staytime: currentComponent.getStaytime(),
      entrytime: currentComponent.entrytime
    });
  }
}

class App extends React.Component<BaseProps> {
  constructor(props: BaseProps) {
    super(props);

    global.history = (props as Props).history;
  }

  public state: State = {
    route: [getRoute(this.props as Props)],
    lastPathname: (this.props as Props).location.pathname
  };
  /** 项目中的Page组件 */
  public static component: Page<BSL.PageProps<any>, any, any>[] = [];
  /** 离开页面时记录的滚动条位置 */
  public static scrollLocation: number[] = [];

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const props = this.props as Props;
    return nextProps.location.pathname !== props.location.pathname;
  }

  public static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (nextProps.location.pathname === prevState.lastPathname) {
      return null;
    }
    const nextHistory = nextProps.history as History;
    const loadingElem = document.querySelector('.yj-component-toast-loading');

    // 防止Toast.loading卡死页面
    if (loadingElem) {
      Toast.close();
    }

    if (nextHistory.action === 'POP') {
      pop(nextProps);
      prevState.route.pop();
      const component = App.getStackComponent();
      if (component && component.pageName) {
        setDocumetTitle(component.pageName);
        component.pageActive();
      }
    } else {
      if (nextHistory.action === 'REPLACE') {
        global.replaceBeforeComponent = {...App.getStackComponent()} as any;
        // onReplace();
        // pop当前这个页面
        pop(nextProps);
        prevState.route.pop();
      }

      App.scrollLocation.push(window.scrollY);
      prevState.route.push(getRoute(nextProps));
    }

    if (prevState.route.length === 0) {
      App.scrollLocation.push(window.scrollY);
      prevState.route.push(getRoute(nextProps));
    }

    if (nextProps.onRouteChange) {
      nextProps.onRouteChange(nextProps.location.pathname);
    }

    return {
      route: prevState.route,
      lastPathname: nextProps.location.pathname
    };
  }

  /** 从stack中获取当前页面 */
  public static getStackComponent(): PageType | undefined {
    return App.component[App.component.length - 1];
  }

  // public componentDidUpdate(prevProps: Props): void {
  //   const props = this.props as Props;
  // }

  public render(): JSX.Element[] | JSX.Element {
    return this.state.route;
  }
}

export default withRouter(App as any) as typeof App;
