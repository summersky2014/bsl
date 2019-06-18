import { dispatch } from './Scheduler';

type Type = 'string' | 'number' | 'bigint' | 'object' | 'array' | 'boolean';

class Dispatcher<T> {
  /**
   * @param value
   * @param isSaveRawData 对bigint、boolean、number、string不受影响，对object、array起作用。对于大数据时，关闭此项会提高性能
   */
  constructor(value: T, isSaveRawData: boolean = true) {
    const type = typeof value;
    this.value = value;

    if (type === 'symbol' || type === 'undefined' || type === 'function') {
      console.error('不支持symbol、undefined、function数据类型');
    } else {
      this.type = Array.isArray(value) ? 'array' : (typeof value) as Type;
    }

    if (type === 'bigint' || type === 'boolean' || type === 'number' || type === 'string') {
      this.rawData = value;
    } else if (isSaveRawData) {
      this.rawData = JSON.parse(JSON.stringify(value));
    }

    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this.reset = this.reset.bind(this);
  }

  private value: T;
  private rawData: T | undefined;
  public readonly type!: Type;
  public id: number = 1;

  public set(value: T): void;
  public set(key: keyof T, value: T[keyof T]): void;
  public set(valueOrKey: T | keyof T, value?: T[keyof T]): void {
    const type = this.type;

    if ((type === 'object' || type === 'array') && value !== undefined) {
      this.value[valueOrKey as keyof T] = value as T[keyof T];
    } else {
      this.value = valueOrKey as T;
    }
    this.id++;
    dispatch();
  }

  public get(): T {
    return this.value;
  }

  public reset() {
    if (this.rawData) {
      this.value = this.rawData;
      this.id++;
      dispatch();
    } else {
      console.error('reset失败，请检查是否把isSaveRawData设置为false');
    }
  }
}

export default Dispatcher;