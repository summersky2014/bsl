import BSL from '../typings';
import * as React from 'react';
import { History } from 'history';
import { withRouter, Switch, HashRouter, BrowserRouter } from 'react-router-dom';
import { createSubscription } from 'create-subscription';
import PageComponent from './PageComponent';
// import Toast from '../Toast';

type PageType = PageComponent<BSL.PageProps<any>, any, any>;

interface BaseProps {
  /** 路由改变时触发 */
  onRouteChange?: (pathname: string) => void;
  children: JSX.Element[];
  router: typeof HashRouter | typeof BrowserRouter;
}

// withRouter提供dreact-router的porps
interface Props extends BaseProps, BSL.PageProps<any> {
  history: History;
}

interface State {
  /** 当前匹配的路由 */
  route: JSX.Element[];
  lastPathname: string;
}

let subscribeCallback: (model: object) => void;
let dispatchLock: boolean = false;
let rafId: number | undefined = 1;

function rafDispatch(): void {
  if (dispatchLock === false && subscribeCallback) {
    subscribeCallback({});
    dispatchLock = true;
  }

  if (App.inputFoucs && rafId) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  } else {
    rafId = requestAnimationFrame(rafDispatch);
  }
}

/** 是否是replace动作 */
function isReplaceAction(nextProps: Props): boolean {
  const action = nextProps.history.action;
  const isReplace = action === 'REPLACE';

  return isReplace;
}

/** 卸载一个页面 */
function pop(nextProps: Props): void {
  const top = App.scrollLocation[App.scrollLocation.length - 1];

  if (App.pages.length) {
    onPop(nextProps);
  }

  App.pages.pop();
  App.scrollLocation.pop();
  global.currentPageId--;
  window.scrollTo(0, top);
}

/** 添加页面事件 */
function onPush(nextProps: Props): void {
  const currentComponent = App.getPrevPageClassDeclaration(2);

  // 上一个页面的离开事件
  if (currentComponent && currentComponent.pageLeave) {
    currentComponent.pageLeave();
  }
}

/** 卸载页面事件 */
function onPop(nextProps: Props): void {
  if (isReplaceAction(nextProps)) {
    return;
  }

  const toComponent = App.getPrevPageClassDeclaration(2);

  // 目标页面的进入事件
  if (toComponent && toComponent.pageEnter) {
    toComponent.pageEnter();
    // 后退回页面时，重置进入时间
    toComponent.entrytime = Date.now();
  }
}

// 对route中返回的page element手动创建
function getRoute(nextProps: Props): JSX.Element {
  global.currentPageId++;
  const appRoute = (props: { key: number, location: Props['location'] }) => {
    return (
      <Switch location={props.location}>
        {nextProps.children}
      </Switch>
    );
  };

  return React.createElement(appRoute, {
    key: global.currentPageId,
    location: nextProps.location
  });
}

class App extends React.Component<BaseProps> {
  constructor(props: BaseProps) {
    super(props);

    App.history = (props as Props).history;
  }

  public state: State = {
    route: [getRoute(this.props as Props)],
    lastPathname: (this.props as Props).location.pathname
  };
  /** 储存页面 */
  public static pages: PageComponent<BSL.PageProps<any>, any, any>[] = [];
  /** 离开页面时记录的滚动条位置 */
  public static scrollLocation: number[] = [];
  /** 是否处于input foucs状态，用于解决中文输入的BUG */
  public static inputFoucs: boolean = false;
  /** 运行时的环境变量 */
  public static env: BSL.Env = process.env.NODE_ENV as BSL.Env;
  public static history: History;

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const props = this.props as Props;
    return nextProps.location.pathname !== props.location.pathname;
  }

  public componentDidMount(): void {
    rafDispatch();
  }

  public static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (nextProps.location.pathname === prevState.lastPathname) {
      return null;
    }
    const nextHistory = nextProps.history as History;
    // const loadingElem = document.querySelector('.yj-component-toast-loading');

    // 防止Toast.loading卡死页面
    // if (loadingElem) {
    //   Toast.close();
    // }

    if (nextHistory.action === 'POP') {
      pop(nextProps);
      prevState.route.pop();
      const component = App.getCurrentPage();
      if (component) {
        component.pageActive();
      }
    } else {
      if (nextHistory.action === 'REPLACE') {
        // pop当前页面
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

    // 路由改变事件
    if (nextProps.onRouteChange) {
      nextProps.onRouteChange(nextProps.location.pathname);
    }

    return {
      route: prevState.route,
      lastPathname: nextProps.location.pathname,
    };
  }

  /** 获取当前页面 */
  public static getCurrentPage(): PageType | undefined {
    return App.pages[App.pages.length - 1];
  }

  // 获取上N个页面的类声明
  public static getPrevPageClassDeclaration(prevCount: number): PageType | undefined {
    return App.pages[App.pages.length - prevCount];
  }

  /** 广播，将数据的更新从上至下传播出去 */
  public static dispatch(): void {
    // 判断是否是从输入框触发的，如果是就不加setTimeout，因为输入框加setTimeout在输入中文时会有BUG
    if (App.inputFoucs) {
      subscribeCallback({});
      App.inputFoucs = false;
      dispatchLock = true;
    } else {
      dispatchLock = false;
      if (rafId === undefined) {
        rafDispatch();
      }
    }
  }

  public render(): JSX.Element[] {
    return this.state.route;
  }
}

export const global = {
  currentPageId: 1
};
export const Context = React.createContext({});
export const Subscription: React.ComponentFactory<any, any> = createSubscription({
  getCurrentValue: (model: object) => {
    return model;
  },
  subscribe: (model: object, callback: (model: object) => void) => {
    subscribeCallback = callback;
    return () => null;
  }
});
/** 添加一个页面 */
export function push(nextProps: Props): void {
  onPush(nextProps);
  window.scrollTo(0, 0);
}
// @ts-ignore
export default withRouter(App) as typeof App;
