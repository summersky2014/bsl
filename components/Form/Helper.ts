
import BSL from '../../typings';
import Dispatcher from '../../app/Dispatcher';

export interface Options<T> {
  defaultValue?: T;
  required?: boolean;
}

abstract class Helper<T> {
  constructor(options?: Options<T>) {
    if (options) {
      if (options.required) {
        this.required = options.required;
      }
    }
  }

  protected required = false;
  public abstract value: Dispatcher<T>;
  public abstract state: BSL.RequestState;
  public abstract onChange(value: T): boolean;
}

export default Helper;