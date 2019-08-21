import Helper, { Options } from '../Form/Helper';
import Dispatcher from '../../app/Dispatcher';
import { Type } from '../SwitchView';
import { Value } from './Item';

class PickerHelper extends Helper<Value[]> {
  constructor(options?: Options<Value[]>) {
    super(options);

    this.value = new Dispatcher(options && options.defaultValue || []);
  }

  public value: Dispatcher<Value[]>;
  public state: Type = 'undefined';

  public onChange = (value: Value[]) => {
    const isEmpty = value.length === 0 || (value[0] && (value[0].value === undefined || value[0].value === null));
    this.state = isEmpty && this.required ? 'empty' : 'complete';
    this.value.set(value);

    return this.state === 'complete';
  }
}

export default PickerHelper;
