import { createContext,  } from 'react';
import { createSubscription } from 'create-subscription';
import { appData } from './core';

export type ListenerCallback = (currentTime: number, overTime: number) => boolean;
export interface Listen {
  execTimestamp: number;
  overTime: number;
  callback: ListenerCallback;
}

let subscribeCallback: (model: object) => void;
let rafId: number | undefined = 1;
/** 更新锁 */
let updateLock = true;
/** 锁枕 */
let frameLock = false;
/** 向raf插入事件的数组 */
const listens: Listen[] = [];
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

/** 更新循环, 在整个应用生命周期中每帧检测是否需要更新界面 */
function updateLoop(): void {
  const listensLength = listens.length;
  frameLock = false;

  if (listensLength) {
    const time = Date.now();
    for (let i = 0; i < listensLength; i++) {
      const listen = listens[i];

      // 判断listen是否存在，有可能callback里会执行removeListener，然后isten被销毁了
      if (listen) {
        // execTimestamp为0代表还没初始化
        if (listen.execTimestamp === 0) {
          listen.execTimestamp = time;
        }
        listen.overTime = time - listen.execTimestamp;
        // callback返回ture表示函数已正确执行，将重置execTimestamp
        
        if (listen.callback(time, listen.overTime)) {
          listen.execTimestamp = time;
        }
      }
    }
  }

  if (updateLock === false && subscribeCallback) {
    subscribeCallback({});
    updateLock = true;
  }

  if (appData.inputFoucs && rafId) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  } else {
    rafId = requestAnimationFrame(updateLoop);
  }
}

/** 向更新循环添加回调 */
function addListener(callback: ListenerCallback): void {
  listens.push({
    callback,
    execTimestamp: 0,
    overTime: 0
  });
}

/** 向更新循环删除回调 */
function removeListener(callback: ListenerCallback): void {
  const index = listens.findIndex((item) => item.callback === callback);
  listens.splice(index, 1);
}

/** 每帧执行 */
function frame(callback: () => void) {
  if (frameLock === false) {
    callback();
    frameLock = true;
  }
}

/** 用于数据更新 */
function dispatch(): void {
  // 判断是否是从输入框触发的，如果是就不加setTimeout，因为输入框加setTimeout在输入中文时会有BUG
  if (appData.inputFoucs) {
    subscribeCallback({});
    appData.inputFoucs = false;
    updateLock = true;
  } else {
    updateLock = false;
    if (rafId === undefined) {
      updateLoop();
    }
  }
}

export {
  Context,
  Subscription,
  updateLoop,
  addListener,
  removeListener,
  frame,
  dispatch
};