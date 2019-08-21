import * as React from 'react';
import Picker, { Base as PikcerProps, DefaultProps as BaseDefaultProps, PickerHelper } from '../Picker';
import { Value } from '../Picker/Item';
import { FromTypeProps } from '../Form';
import createRangeDate from '../../utils/createRangeDate';
import dateformat, { Mode } from '../../utils/dateformat';

export interface DefaultProps {
  minDate?: Date;
  maxDate?: Date;
  mode?: Mode;
}

const defaultProps: Required<DefaultProps> = {
  minDate: new Date(2000, 0, 1, 0, 0),
  maxDate: new Date(2030, 0, 1, 23, 0),
  mode: 'yyMMddHHmm',
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
      updateId={0}
      cascade
      format={props.format ? props.format : (value) =>  dateformat(value.slice(), props.mode!)}
    />
  );
}

DatePicker.defaultProps = defaultProps;
export { PickerHelper };
export default DatePicker;