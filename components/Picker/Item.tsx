import * as React from 'react';
import * as classNames from 'classnames';
import styles from './style';
import { css } from 'aphrodite/no-important';

import BetterScroll from '@better-scroll/core';
import Wheel from '@better-scroll/wheel';
import anyuseTimeout from '../../hooks/anyuseTimeout';

export interface Value {
  value: string | number;
  label: string | number;
}

export interface Data {
  label: string | number;
  value: string | number;
  children?: Data[];
}

export interface Base {
  /** item组件根样式 */
  itemCls?: string;
  /** 选项文本的样式 */
  textCls?: string;
  /** 是否是DatePicker组件在调用，仅在库内部使用 */
  _datepicker?: boolean;
}

interface Props extends Base {
  /** 渲染的数据 */
  data: Data[];
  /** 选中的值 */
  value: Value;
  /** 滚动结束后 */
  onScrollEnd: (value: Value, selectedIndex: number) => void;
  updateId: number | string;
}

export const itemHeight = 34;
/** 计算显示区域内居中的序号 */
function calcNum(): number {
  const rootHeight = itemHeight * 7;
  let value = Math.floor(rootHeight / itemHeight);
  if (value % 2 === 0) {
    value--;
  }
  value--;
  value /= 2;

  return value;
}

BetterScroll.use(Wheel);
export const num: number = calcNum();
const prefixCls = 'bsl-picker-item';
const textStyleCls = css(styles.itemText);
function getIndex(data: Data[], value: Value) {
  if (value) {
    const index = data.findIndex((item) => item.value === value.value);
    return index === - 1 ? 0 : index;
  }
  return 0;
}

function Item(props: Props) {
  const { itemCls, textCls } = props;
  const elemRef = React.useRef<HTMLDivElement>(null);
  const wheel = React.useRef<BetterScroll>();
  const propsData = React.useRef<Data[]>();
  const isDidUpdate = React.useRef(false);
  const [setTimeOut, clearTimeOut] = anyuseTimeout();


  React.useEffect(() => {
    const timer = () => {
      if (wheel.current && propsData.current) {
        
        const selectedIndex = wheel.current.getSelectedIndex();
        const index = propsData.current.length <= selectedIndex ? propsData.current.length - 1 : selectedIndex;
        const item = propsData.current[index] || propsData.current[0];
        if (selectedIndex !== index) {
          wheel.current.wheelTo(index);
        }
        props.onScrollEnd({ label: item.label, value: item.value }, index);
      }
      return true;
    };
    const onScrollEnd = () => {
      setTimeOut(timer, 16);
    };
    wheel.current = new BetterScroll(elemRef.current!, {
      scrollX: false,
      scrollY: true,
      wheel: {
        selectedIndex: getIndex(props.data, props.value),
        rotate: 0,
        adjustTime: 300,
        wheelWrapperClass: `${prefixCls}-col`,
        wheelItemClass: textStyleCls
      },
      swipeTime: 1000,
      bounceTime: 300,
      probeType: 3
    });
    wheel.current.on('scrollEnd', onScrollEnd);

    return () => {
      if (wheel.current) {
        wheel.current.off('scrollEnd', onScrollEnd);
        wheel.current.destroy();
      }
      clearTimeOut(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (wheel.current && isDidUpdate.current) {
      wheel.current.refresh();
      if (!props._datepicker) {
        
        wheel.current.wheelTo(0);
      }
    }
    propsData.current = props.data;
    isDidUpdate.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateId]);

  return (
    <div
      className={classNames(css(styles.item), itemCls, prefixCls)}
      ref={elemRef}
      style={{
        padding: `${itemHeight * num}px 0`
      }}
    >
      <div className={`${prefixCls}-col`}>
        {props.data.map((item, i) => (
          <div
            key={item.value}
            className={classNames(textStyleCls, textCls, `${prefixCls}-text`)}
          >{item.label}</div>
        ))}
      </div>
    </div>
  );
}


export default Item;