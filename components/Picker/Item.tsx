import * as React from 'react';
import * as classNames from 'classnames';
import * as BetterScroll from '@better-scroll/core';
import Wheel from '@better-scroll/wheel';
import anyuseTimeout from '../../hooks/anyuseTimeout';
import './index.scss';

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

BetterScroll.default.use(Wheel);
export const itemHeight: number = 34;
export const num: number = calcNum();
const prefixCls = 'bsl-picker-item';

function getIndex(data: Data[], value: Value) {
  if (value) {
    const index = data.findIndex((item) => item.value === value.value);
    return index === - 1 ? 0 : index;
  }
  return 0;
}

function Item(props: Props) {
  const { itemCls, textCls } = props;
  const elemRef = React.createRef<HTMLDivElement>();
  const wheel = React.useRef<BetterScroll.default>();
  const propsData = React.useRef<Data[]>();
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
    wheel.current = new BetterScroll.default(elemRef.current!, {
      scrollX: false,
      scrollY: true,
      wheel: {
        selectedIndex: getIndex(props.data, props.value),
        rotate: 0,
        adjustTime: 300,
        wheelWrapperClass: `${prefixCls}-col`,
        wheelItemClass: `${prefixCls}-text`
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
  }, []);

  React.useEffect(() => {
    if (wheel.current) {
      wheel.current.refresh();
    }
    propsData.current = props.data;
  }, [props.updateId]);

  return (
    <div
      className={classNames(prefixCls, itemCls)}
      ref={elemRef}
      style={{
        padding: `${itemHeight * num}px 0`
      }}
    >
      <div className={`${prefixCls}-col`}>
        {props.data.map((item, i) => (
          <div
            key={item.value}
            className={classNames(`${prefixCls}-text`, textCls)}
          >{item.label}</div>
        ))}
      </div>
    </div>
  );
}

export default Item;