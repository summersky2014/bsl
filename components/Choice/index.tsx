import BSL from '../../typings';
import * as React from 'react';
import * as classNames from 'classnames';
import produce, { Draft } from "immer";
import { FromTypeProps } from '../../components/Form';
import ChoiceHelper from './Helper';
import memoAreEqual from '../../utils/memoAreEqual';

export interface Value {
  /** 数据的唯一标示 */
  id: string | number;
  [key: string]: string | number;
}
export interface BaseProps<T extends Value> extends BSL.ComponentProps {
  /** 渲染的数据 */
  data: T[];
  /** 激活的值 */
  value: T[];
}

export type OnClick<T extends Value> = (event: React.MouseEvent<HTMLDivElement>, value: T[], current: T, index: number) => void;

export interface Props<T extends Value> extends BaseProps<T>, FromTypeProps<T[]> {
  onChange: (value: any[], item: T, index: number) => boolean;
  /** item是data遍历的项, index是遍历的索引，value是选中的值 */
  children: (item: T, active: boolean, index: number) => any;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 只有1个选项并且可以开关时启用 */
  switch?: boolean;
  /** 最多可选数量 */
  max?: number;
  itemCls?: string;
}

/** 用于更新props value */
function createNewValue<T extends Value>(props: Props<T>, nextValue: T): T[] {
  const { multiple, value } = props;

  if (multiple) {
    // 多选
    const index = value.findIndex((item) => item.id === nextValue.id);
    return produce(value, (draft) => {
      if (index >= 0) {
        draft.splice(index, 1);
      } else {
        draft.push(nextValue as Draft<T>);
      }
    });
  } else if (props.switch) {
    // 如果开启了switch，就会有勾选或取消勾选的功能
    if (value[0]) {
      return value[0].id === nextValue.id ? [] : [nextValue];
    }

    return [nextValue];
  } else {
    // 单选
    return [nextValue];
  }
}

function onClick<T extends Value>(event: React.MouseEvent<HTMLDivElement>, props: Props<T>, item: T, index: number): void {
  const { onChange, disabled, multiple, value, max } = props;
  
  if (disabled) {
    return;
  }

  const valueFirst = value[0];

  // 防止重复点击
  if (multiple !== true && props.switch !== true && valueFirst && valueFirst.id === item.id)  {
    return;
  }

  if (((max && value.length < max) || max === undefined)) {
    const newValue = createNewValue<T>(props, item);
    
    // 小于max数量时
    if (onChange) {
      onChange(newValue, item, index);
    }
  }
  // else if (value && (max && value.size >= max) && value.findIndex((item) => item.id === nextValueFirst.id) >= 0) {
  //   // 超过max数量时，将
  //   callbackOnClick(event, this.createNewValue(nextValue[0]), index);
  // }
}

function isActive<T extends Value>(value: T[], current: T): boolean {
  const index = value.findIndex((item) => {
    return item.id === current.id;
  });
  return index >= 0;
}

const prefixCls = 'bsl-choice';
function Choice<T extends Value>(props: Props<T>) {
  const { children, value, data, className, id, style, state, itemCls } = props;
  return (
    <div
      className={classNames(prefixCls, className, 'bsl_component')}
      id={id}
      style={style}
      data-state={state}
    >
      {data.map((item, i) => {
        const active = isActive(value, item);
        return (
          <div
            className={classNames(`${prefixCls}-item`, itemCls) }
            style={{
              userSelect: 'none'
            }}
            key={item.id}
            onClick={(e) => onClick(e, props, item, i)}
            data-active={active}
          >
            {children(item, active, i)}
          </div>
        );
      })}
    </div>
  );
}

export { ChoiceHelper };
export default React.memo(Choice, memoAreEqual) as typeof Choice;
