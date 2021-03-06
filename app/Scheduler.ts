import { createSubscription } from 'create-subscription';
import { createContext } from 'react';
import { appData } from './core';

export type ListenerCallback = (currentTime: number, overTime: number) => boolean;
export interface Listen {
  execTimestamp: number;
  overTime: number;
  callback: ListenerCallback;
}

let subscribeCallback: (model: Record<string, unknown>) => void;
/** 更新锁 */
let updateLock = true;
/** 锁枕 */
let frameLock = false;

/** 向raf插入事件的数组 */
const listens: Set<Listen> = new Set([]);
const Context = createContext({});
const Subscription: React.ComponentFactory<any, any> = createSubscription({
  getCurrentValue: (model: Record<string, unknown>) => {
    return model;
  },
  subscribe: (model: Record<string, unknown>, callback: (model: Record<string, unknown>) => void) => {
    subscribeCallback = callback;
    return () => null;
  }
});

/**  更新循环, 在整个应用生命周期中每帧检测是否需要更新界面 */
function updateLoop(): void {
  const listensLength = listens.size;
  frameLock = false;
  
  if (listensLength) {
    const time = Date.now();

    listens.forEach((listen) => {
      // 判断listen是否存在，有可能callback里会执行removeListener，然后listen被销毁了
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
    });
  }

  // 如果没有触发过dispatch就不执行更新
  if (updateLock === false && subscribeCallback) {
    subscribeCallback({});
    updateLock = true;
  }

  requestAnimationFrame(updateLoop);
}

/** 向更新循环添加回调 */
function addListener(callback: ListenerCallback): void {
  listens.add({
    callback,
    execTimestamp: 0,
    overTime: 0
  });
}

/** 向更新循环删除回调 */
function removeListener(callback: ListenerCallback): void {
  listens.forEach((listen) => {
    if (listen.callback === callback) {
      listens.delete(listen);
    }
  });
}

/** 每帧执行 */
function frame(callback: () => void) {
  if (frameLock === false) {
    callback();
    frameLock = true;
  }
}

/** 
 * 用于数据更新
 * @param time 更新间隔时间
 */
function dispatch(): void {
  // 判断是否是从输入框触发的，如果是就不加setTimeout，因为输入框加setTimeout在输入中文时会有BUG
  if (appData.inputFoucs) {
    subscribeCallback({});
    appData.inputFoucs = false;
    updateLock = true;
  } else {
    updateLock = false;
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