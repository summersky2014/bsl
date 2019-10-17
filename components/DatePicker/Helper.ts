import Helper from '../Picker/Helper';
import { Options } from '../Form/Helper';
import Dispatcher from '../../app/Dispatcher';
// import { Type } from '../SwitchView';
import { Value } from '../Picker/Item';
import dateformat, { Mode } from '../../utils/dateformat';
import newDate from '../../utils/newDate';

function getRangDate(date: Date): Value[] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [{
    label: year,
    value: year
  }, {
    label: month,
    value: month
  }, {
    label: day,
    value: day
  }];
}

class DatePickerHelper extends Helper {
  constructor(options?: Options<Value[] | string | number>) {
    super(options as Options<Value[]>);

    if (options && options.defaultValue) {
      const type = typeof options.defaultValue;
      if (type === 'string' || type === 'number') {
        this.value = new Dispatcher(getRangDate(newDate(options.defaultValue as string | number)));
      }
    } else {
      this.value = new Dispatcher([] as Value[]);
    }
  }

  /** 格式化输出 */
  public format(mode: Mode) {
    if (this.value.get().length) {
      return dateformat(this.value.get(), mode);
    }

    return '';
  }
}

export default DatePickerHelper;
