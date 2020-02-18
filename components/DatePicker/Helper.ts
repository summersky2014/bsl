import Helper from '../Picker/Helper';
import { Options } from '../Form/Helper';
import { Value } from '../Picker/Item';
import dateformat, { Mode } from '../../utils/date/dateformat';
import newDate from '../../utils/date/newDate';

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
        this.value = getRangDate(newDate(options.defaultValue as string | number));
      }
    } else {
      this.value = [];
    }
  }

  /** 格式化输出 */
  public format(mode: Mode) {
    if (this.value.length) {
      return dateformat(this.value, mode);
    }

    return '';
  }
}

export default DatePickerHelper;
