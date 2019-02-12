import BSL from '../typings';
import { createContext,  } from 'react';
import { createSubscription } from 'create-subscription';
import { History } from 'history';
import PageComponent from './PageComponent';

type PageType = PageComponent<BSL.PageProps<any>, any, any>;

interface AppData {
  pages: PageComponent<BSL.PageProps<any>, any, any>[];
  scrollLocation: number[];
  history: History | undefined;
  inputFoucs: boolean;
  env: BSL.Env;
  currentPageId: number;
}

export interface AppBaseProps {
  /** 路由改变时触发 */
  onRouteChange?: (pathname: string) => void;
  children: JSX.Element[] | JSX.Element;
}

export interface AppProps extends AppBaseProps, BSL.PageProps<any> {
  history: History;
}

let subscribeCallback: (model: object) => void;
let dispatchLock: boolean = false;
let rafId: number | undefined = 1;
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
  currentPageId: 1,
};

const Context = createContext({});
const Subscription: React.ComponentFactory<any, any> = createSubscription({
  getCurrentValue: (model: object) => {
    return model;
  },
  subscribe: (model: object, callback: (model: object) => void) => {
    subscribeCallback = callback;
    return () => null;
  }
});

/** 在整个应用生命周期中每帧检测是否需要更新界面 */
function rafDispatch(): void {
  if (dispatchLock === false && subscribeCallback) {
    subscribeCallback({});
    dispatchLock = true;
  }

  if (appData.inputFoucs && rafId) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  } else {
    rafId = requestAnimationFrame(rafDispatch);
  }
}

/** 用于数据更新 */
function dispatch(): void {
  // 判断是否是从输入框触发的，如果是就不加setTimeout，因为输入框加setTimeout在输入中文时会有BUG
  if (appData.inputFoucs) {
    subscribeCallback({});
    appData.inputFoucs = false;
    dispatchLock = true;
  } else {
    dispatchLock = false;
    if (rafId === undefined) {
      rafDispatch();
    }
  }
}

/** 获取当前页面 */
function getCurrentPage(): PageType | undefined {
  return appData.pages[appData.pages.length - 1];
}

/* 获取上N个页面的类声明 */
function getPrevPageClassDeclaration(prevCount: number): PageType | undefined {
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
  onPush(nextProps);
  window.scrollTo(0, 0);
}

/** 卸载一个页面 */
function pop(nextProps: AppProps): void {
  const top = appData.scrollLocation[appData.scrollLocation.length - 1];

  if (appData.pages.length) {
    onPop(nextProps);
  }

  appData.pages.pop();
  appData.scrollLocation.pop();
  appData.currentPageId--;
  window.scrollTo(0, top);
}

/** 添加页面事件 */
function onPush(nextProps: AppProps): void {
  const currentPage = getPrevPageClassDeclaration(2);

  // 上一个页面的离开事件
  if (currentPage && currentPage.pageLeave) {
    currentPage.pageLeave();
  }
}

/** 卸载页面事件 */
function onPop(nextProps: AppProps): void {
  if (isReplaceAction(nextProps)) {
    return;
  }

  const toPage = getPrevPageClassDeclaration(2);

  // 目标页面的进入事件
  if (toPage && toPage.pageEnter) {
    toPage.pageEnter();
    // 后退回页面时，重置进入时间
    toPage.entrytime = Date.now();
  }
}

export {
  appData,
  getCurrentPage,
  getPrevPageClassDeclaration,
  rafDispatch,
  dispatch,
  isReplaceAction,
  push,
  pop,
  Context,
  Subscription
};