import * as React from 'react';
import Picker, { Base as PikcerProps, DefaultProps as BaseDefaultProps } from '../Picker';
import DatePickerHelper from './Helper';
import { Value } from '../Picker/Item';
import { FromTypeProps } from '../Form';
import createRangeDate from '../../utils/date/createRangeDate';
import dateformat, { Mode } from '../../utils/date/dateformat';

export interface DefaultProps {
  /**
   * 最小日期
   * @default 2000-01-01
   */
  minDate?: Date;
  /**
   * 最大日期
   * @default 2030-01-01
   */
  maxDate?: Date;
  mode?: Mode;
}

const defaultProps: Required<DefaultProps> = {
  minDate: new Date(2000, 0, 1, 0, 0),
  maxDate: new Date(2030, 0, 1, 0, 0),
  mode: 'yyMMddHHmm'
};
function DatePicker(props: Omit<PikcerProps, 'updateId'>  & BaseDefaultProps & DefaultProps & FromTypeProps<Value[]>) {
  const data = React.useMemo(() => createRangeDate({
    minDate: props.minDate!,
    maxDate: props.maxDate!,
    mode: props.mode
  }), [props.minDate, props.maxDate, props.mode]);

  return (
    <Picker
      {...props}
      data={data}
      cascade
      format={props.format ? props.format : (value) =>  dateformat(value.slice(), props.mode!)}
      _datepicker
    />
  );
}

DatePicker.defaultProps = defaultProps;
export { DatePickerHelper };
export default DatePicker;