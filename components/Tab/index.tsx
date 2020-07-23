import * as classNames from 'classnames';
import * as React from 'react';
import BSL from '../../typings';
import memoAreEqual from '../../utils/system/memoAreEqual';
import Choice, { BaseProps, Props as ChoiceProps, Value } from '../Choice';

export interface Props<T extends Value> extends BSL.ComponentProps, Pick<BaseProps<T>, 'data'>, Pick<ChoiceProps<T>,'itemCls'> {
  value: BaseProps<T>['value'];
  /** 单个选项卡的样式名 */
  itemCls?: string;
  /** 激活选项卡的样式名 */
  activeCls?: string;
  /** 单个选项卡文字的样式名 */
  textCls?: string;
  onChange: (newValue: Value[]) => void;
}

const prefixCls = 'bsl-tab';
function Tab<T extends Value>(props: Props<T>) {
  const { itemCls, value } = props;
  const data = props.data;
  const onChange = (newValue: Value[]) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
    return true;
  };

  return (
    <Choice
      {...props}
      className={classNames(prefixCls, props.className)}
      itemCls={itemCls}
      data={data}
      value={value}
      onChange={onChange}
      state="undefined"
    >
      {(item, active) => (
        <div className={classNames(`${prefixCls}-item`, props.textCls, {
          [`${prefixCls}-active`]: active,
          [props.activeCls || '']: active
        })}>
          {item.id}
        </div>
      )}
    </Choice>
  );
}

export { Value };
export default React.memo(Tab, memoAreEqual);
