import produce, { Draft } from "immer";
import { dispatch } from './Scheduler';

export type UiUpdate = (() => void);

class Dispatcher<T> {
  /**
   * 
   * @param value 可以传入除symbol、undefined、null、function外的任何值
   * @param uiUpdate 用于触发UI更新的函数，如果传入null则采用从全局更新的模式
   */
  constructor(value: T, uiUpdate?: UiUpdate) {
    const type = typeof value;

    if (type !== 'object' || value === null) {
      throw '只支持对象或数组';
    }
    
    this.value = value;
    this.prevValue = value;
    this.initData = value;
    this.uiUpdateFun = uiUpdate;
    this.reset = this.reset.bind(this);
  }

  /** 初始化数据 */
  private readonly initData: T;
  /** 当前数据 */
  private value: T;
  /** 用于触发UI更新的函数 */
  private uiUpdateFun: (() => void) | undefined;
  /** 上一次的数据 */
  public prevValue: T;

  public set(update: (draft: Draft<T>) => void): void {
    this.value = produce(this.prevValue, (draftState) => {
      this.prevValue = this.value;
      update(draftState);
    });
    
    if (this.uiUpdateFun) {
      this.uiUpdateFun();
    } else {
      dispatch();
    }
  }

  public get(): T {
    return this.value;
  }

  public reset() {
    this.value = this.initData;
    if (this.uiUpdateFun) {
      this.uiUpdateFun();
    } else {
      dispatch();
    }
  }
}

export default Dispatcher;