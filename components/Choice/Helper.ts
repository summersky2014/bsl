import Helper, { Options } from '../Form/Helper';
import Dispatcher from '../../app/Dispatcher';
import { Type } from '../SwitchView';
import { Value } from './index';

class ChoiceHelper<T extends Value> extends Helper<T[]> {
  constructor(options?: Options<T[]>) {
    super(options);

    this.value = new Dispatcher(options && options.defaultValue || []);
  }

  public value!: Dispatcher<T[]>;
  public state: Type = 'undefined';

  public onChange = (value: T[]) => {
    this.state = value.length === 0 && this.required ? 'empty' : 'complete';
    this.value.set(value);
    return this.state === 'complete';
  }
}

export default ChoiceHelper;
