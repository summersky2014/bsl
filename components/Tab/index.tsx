import BSL from '../../typings';
import * as React from 'react';
import Dispatcher from '../../app/Dispatcher';
import Choice, { BaseProps, Value, Props as ChoiceProps } from '../Choice';

interface Props<T extends Value> extends BSL.ComponentProps, Pick<BaseProps<T>, 'data'>, Pick<ChoiceProps<T>, 'itemCls'> {
  value: Dispatcher<BaseProps<T>['value']>;
  updateId?: number;
  onChange?: (newValue: Value[]) => void;
}

function Tab<T extends Value>(props: Props<T>) {
  const { className, updateId, itemCls, value } = props;
  const data = props.data;
  // tslint:disable-next-line: max-line-length
  // const stateValue = React.useMemo(() => new Dispatcher<BaseProps<BaseData>['value']>([data[0]]), [props.value ? props.value.toString() : '']);
  // const [stateValue, setStateValue] = React.useState<BaseProps<BaseData>['value']>([data[0]]);
  const onChange = (newValue: Value[]) => {
    value.set(newValue as T[]);
    if (props.onChange) {
      props.onChange(newValue);
    }
    return true;
  };

  return (
    <Choice
      className={className}
      itemCls={itemCls}
      data={data}
      value={value.get()}
      updateId={updateId ? updateId + value.id : value.id}
      onChange={onChange}
      state="undefined"
    >
      {(item, active) => item.id}
    </Choice>
  );
}

export default Tab;
