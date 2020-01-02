import BSL from '../../typings';
import Helper, { Options } from '../Form/Helper';
import validate from '../../utils/validate';

interface InputOptions extends Options<string> {
  validate?: ((value: string) => boolean) | keyof typeof validate;
}

class InputHelper extends Helper<string> {
  constructor(options?: InputOptions) {
    super(options);
    if (options && options.validate) {
      this.validate = options.validate;
    }
    this.value = options?.defaultValue || '';
  }

  protected value!: string;
  private validate: InputOptions['validate'] | undefined;
  public state: BSL.RequestState = 'undefined';

  public onChange = (value: string) => {
    if (!value && this.required) {
      this.state = 'empty';
    } else if (this.validate && value) {
      if (typeof this.validate === 'string') {
        this.state = validate[this.validate](value) ? 'complete' : 'fail';
      } else {
        this.state = this.validate(value) ? 'complete' : 'fail';
      }
    } else {
      this.state = 'undefined';
    }
    this.value = value;
    this.update();

    return this.state === 'complete' || this.state === 'undefined';
  }

  public clear = () => {
    this.state = 'undefined';
    this.value = '';
    this.update();
  }
}

export default InputHelper;
