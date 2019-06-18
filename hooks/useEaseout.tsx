import { addListener, removeListener, ListenerCallback } from '../app/Scheduler';

function easeOut(currentTime: number, beginningValue: number, changeValue: number, duration: number): number {
  return -changeValue * (currentTime /= duration) * (currentTime - 2) + beginningValue;
}

/**
 * 缓动滑动，先快后慢
 * @param beginningValue 开始的值
 * @param changeValue 变化的值，即增加或减少的值
 * @param duration 动画持续时间
 * @param callback 每帧动画的回调，返回false可以提前终止动画
 * @param endCallback 动画结束后的回调，提前终止的动画也会触发
 */
function easeOutRun(
  beginningValue: number,
  changeValue: number,
  duration: number,
  callback: (currentValue: number) => boolean | undefined,
  endCallback?: (currentValue: number) => void
): ListenerCallback {
  let prevValue = 0;
  let isEnd = false;
  const listenerCallback: ListenerCallback = (currentTime: number, overTime: number): boolean => {
    const value = easeOut(overTime, beginningValue, changeValue, duration);
    const end = () => {
      if (endCallback) {
        endCallback(prevValue);
      }
      isEnd = true;
      removeListener(listenerCallback);
    };
    if (overTime < duration && isEnd === false) {
      const state = callback(value);
      if (state === false) {
        end();
      } else {
        prevValue = value;
      }
      return false;
    } else {
      end();
      return true;
    }
  };

  addListener(listenerCallback);
  return listenerCallback;
}

/**
 * 终止动画的执行，刻用于组件unMount时动画还在执行的情况
 * @param callback 传递给setEaseout的函数引用
 */
function clearEaseOut(callback: ListenerCallback) {
  removeListener(callback);
}

/**
 * 缓动滑动，先快后慢
 */
export default function useEaseout(): [(...args: Parameters<typeof easeOutRun>) => ListenerCallback, (cb: ListenerCallback) => void] {
  return [easeOutRun, clearEaseOut];
}

export { ListenerCallback };