
import BSL from '../../typings';
import { UiUpdate } from '../../app/Dispatcher';
import { dispatch } from '../../app/Scheduler';

export interface Options<T> {
  /** 默认值 */
  defaultValue?: T;
  /** 是否必填 */
  required?: boolean;
  /** 用于触发UI更新的函数，如果传入null则采用从全局更新的模式 */
  uiUpdate?: UiUpdate;
}

abstract class Helper<T> {
  constructor(options?: Options<T>) {
    this.required = options?.required || false;
    this.update = options?.uiUpdate || dispatch;
  }

  /** 在表单提交时，是否必填 */
  protected readonly required: boolean;
  /** ui更新函数 */
  protected update: UiUpdate;
  /** 当前值 */
  protected abstract value: T;
  /** value的状态，可用于表单验证 */
  public abstract state: BSL.RequestState;
  /** 改变value的值 */
  public abstract onChange(value: T): boolean;
  /** 获取value的值 */
  public getValue(): T {
    return this.value;
  }
}

export default Helper;