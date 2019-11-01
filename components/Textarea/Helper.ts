import BSL from '../../typings';
import Helper, { Options } from '../Form/Helper';
import Dispatcher from '../../app/Dispatcher';
import validate from '../../utils/validate';

interface TextareaOptions extends Options<string> {
  validate?: ((value: string) => boolean) | keyof typeof validate;
}

class TextareaHelper extends Helper<string> {
  constructor(options?: TextareaOptions) {
    super(options);
    this.value = new Dispatcher(options && options.defaultValue || '');
  }

  public value!: Dispatcher<string>;
  public state: BSL.RequestState = 'undefined';

  public onChange = (value: string) => {
    if (!value && this.required) {
      this.state = 'empty';
    }

    this.value.set(value);
    return this.state === 'complete' || this.state === 'undefined';
  }
}

export default TextareaHelper;
