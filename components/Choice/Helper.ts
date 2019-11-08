import BSL from '../../typings';
import Helper, { Options } from '../Form/Helper';
import { Value } from './index';

class ChoiceHelper<T extends Value> extends Helper<T[]> {
  constructor(options?: Options<T[]>) {
    super(options);

    this.value = options?.defaultValue || [];
  }

  protected value: T[];
  public state: BSL.RequestState = 'undefined';

  public onChange = (value: T[]) => {
    const isEmpty = value.length === 0 || (value[0] && (value[0].id === undefined || value[0].id === null));
    this.state = isEmpty && this.required ? 'empty' : 'complete';
    this.value = value;
    this.update();

    return this.state === 'complete';
  }
}

export default ChoiceHelper;
