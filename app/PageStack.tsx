import * as React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import Toast, { prefixCls } from '../components/Toast';
import { AppBaseProps as BaseProps, appData, AppProps as Props, getPrevPageClassDeclaration, pop } from './core';
import { updateLoop } from './Scheduler';

interface State {
  /** 当前匹配的路由 */
  route: JSX.Element[];
  pathname: string;
}

// 对route中返回的page element手动创建
function getRoute(nextProps: Props): JSX.Element {
  appData.currentPageId++;
  const appRoute = (props: { key: number; location: Props['location'] }) => {
    return (
      <Switch location={props.location}>
        {nextProps.children}
      </Switch>
    );
  };

  return React.createElement(appRoute, {
    key: appData.currentPageId,
    location: nextProps.location
  });
}

class PageStack extends React.Component<BaseProps, State> {
  constructor(props: BaseProps, state: State) {
    super(props, state);

    appData.history = (props as Props).history;
  }

  public state: State = {
    route: [getRoute(this.props as Props)],
    pathname: (this.props as Props).location.pathname
  };

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const props = this.props as Props;
    return nextProps.location.pathname !== props.location.pathname;
  }

  public componentDidMount(): void {
    updateLoop();
  }

  public static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (nextProps.location.pathname === prevState.pathname) {
      return null;
    }
    const nextHistory = nextProps.history;
    const loadingElem = document.querySelector('.' + prefixCls + '-loading');

    // 防止Toast.loading卡死页面
    if (loadingElem) {
      Toast.close();
    }
    
    if (nextHistory.action === 'POP') {
      pop(nextProps);
      if (appData.popLevel > 1) {
        prevState.route.splice(prevState.route.length - appData.popLevel, appData.popLevel);
      } else {
        prevState.route.pop();
      }
      
      const page = getPrevPageClassDeclaration(appData.popLevel || 1);
      if (page) {
        page.pageEnter();
        page.pageActive();
      }
    } else {
      if (nextHistory.action === 'REPLACE') {
        // pop当前页面
        pop(nextProps);
        prevState.route.pop();
      }

      appData.scrollLocation.push(window.scrollY);
      prevState.route.push(getRoute(nextProps));
    }

    if (prevState.route.length === 0) {
      appData.scrollLocation.push(window.scrollY);
      prevState.route.push(getRoute(nextProps));
    }

    // 路由改变事件
    if (nextProps.onRouteChange) {
      nextProps.onRouteChange(nextProps.location.pathname);
    }

    // 初始化默认值
    // appData.popLevel = 0;

    return {
      route: prevState.route,
      pathname: nextProps.location.pathname
    };
  }

  public render(): JSX.Element[] {
    return this.state.route;
  }
}


export default withRouter(PageStack as any) as any as typeof PageStack;
