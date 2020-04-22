import { History } from 'history';
import BSL from '../typings';
import PageComponent from './PageComponent';

interface AppData {
  pages: PageComponent<any, any>[];
  scrollLocation: number[];
  history: History | undefined;
  inputFoucs: boolean;
  env: BSL.Env;
  currentPageId: number;
}

export interface AppBaseProps {
  /** 路由改变时触发 */
  onRouteChange?: (pathname: string) => void;
  children: any;
}

export interface AppProps extends AppBaseProps, BSL.PageProps<{}> {
  history: History;
}

/** 应用运行时的数据 */
const appData: AppData = {
  /** 储存页面 */
  pages: [],
  /** 离开页面时记录的滚动条位置 */
  scrollLocation: [],
  /** react-router传递下来的history */
  history: undefined,
  /** 是否处于input foucs状态，用于解决中文输入的BUG */
  inputFoucs: false,
  /** 运行时的环境变量 */
  env: process.env.NODE_ENV as BSL.Env,
  /** 当前页面id */
  currentPageId: 1
};

/* 获取上N个页面的类声明 */
function getPrevPageClassDeclaration<P = {}, S = {}>(prevCount: number): PageComponent<P, S> | undefined {
  return appData.pages[appData.pages.length - prevCount];
}

/** 是否是replace动作 */
function isReplaceAction(nextProps: AppProps): boolean {
  const action = nextProps.history.action;
  const isReplace = action === 'REPLACE';

  return isReplace;
}

/** 添加一个页面 */
function push(nextProps: AppProps): void {
  const currentPage = getPrevPageClassDeclaration(1)!;
  // 页面的进入事件
  if (currentPage?.pageEnter) {
    currentPage.pageEnter();
  }
  if (currentPage?.pageActive) {
    currentPage.pageActive();
  }
  window.scrollTo(0, 0);
}

/** 卸载一个页面 */
function pop(nextProps: AppProps): void {
  const top = appData.scrollLocation[appData.scrollLocation.length - 1];
  const currentPage = getPrevPageClassDeclaration(1)!;
  
  // 页面的离开事件
  if (currentPage?.pageLeave) {
    currentPage.pageLeave();
  }
  if (currentPage?.pageActive) {
    currentPage.pageActive();
  }
  if (appData.pages.length && !isReplaceAction(nextProps)) {
    const toPage = getPrevPageClassDeclaration(2);
    // 目标页面的进入事件
    if (toPage) {
      // 后退回页面时，重置进入时间
      toPage.entrytime = Date.now();
    }
  }
  
  appData.pages.pop();
  appData.scrollLocation.pop();
  appData.currentPageId--;
  setTimeout(() => {
    window.scrollTo(0, top);
  });
}

export {
  appData,
  getPrevPageClassDeclaration,
  isReplaceAction,
  push,
  pop
};