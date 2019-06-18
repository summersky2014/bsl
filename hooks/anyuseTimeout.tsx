import { addListener, removeListener, ListenerCallback } from '../app/Scheduler';

/**
 * 同window.setTimeout
 * @param cb 请传递函数的引用，clearlTimeOut需要函数引用
 * @param delay 延迟时间
 */
function setTimeOut(callback: () => void, delay: number): ListenerCallback {
  const listenerCallback: ListenerCallback = (currentTime: number, overTime: number): boolean => {
    if (overTime >= delay) {
      callback();
      removeListener(listenerCallback);
      return true;
    }
    return false;
  };
  addListener(listenerCallback);

  return listenerCallback;
}

/**
 * 同window.clearTimeout
 * @param callback 传递给setTimeOut的函数引用
 */
function clearTimeOut(callback: ListenerCallback) {
  removeListener(callback);
}

/**
 * 同window.setTimeout，区别在于没有返回值，函数会在组件卸载时自动执行类似clearTimeout的行为
 * @param callback 回调函数
 * @param delay 延迟时间
 */
export default function useTimeout(): [(cb: () => void, delay: number) => ListenerCallback, (cb: ListenerCallback) => void] {
  return [setTimeOut, clearTimeOut];
}

export { ListenerCallback };