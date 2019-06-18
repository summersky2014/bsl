import * as React from 'react';
import * as classNames from 'classnames';
import * as BetterScroll from 'better-scroll';
import './index.scss';

export interface Value {
  value: string | number;
  label: string | number;
}

export interface Data  {
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

export const itemHeight: number = 34;
export const num: number = calcNum();
const prefixCls = 'bsl-picker-item';

function Item(props: Props) {
  const { itemCls, textCls } = props;
  const elemRef = React.createRef<HTMLDivElement>();
  const getIndex = () => props.data.findIndex((item) => item.value === props.value.value);
  let wheel: BetterScroll.default | undefined;

  React.useEffect(() => {
    const onScrollEnd = () => {
      if (wheel) {
        const selectedIndex = wheel.getSelectedIndex();
        const item = props.data[selectedIndex];
        props.onScrollEnd({ label: item.label, value: item.value }, selectedIndex);
      }
    };
    wheel = new BetterScroll.default(elemRef.current!, {
      scrollX: false,
      scrollY: true,
      wheel: {
        selectedIndex: getIndex(),
        rotate: 0,
        adjustTime: 300,
        wheelWrapperClass: `${prefixCls}-col`,
        wheelItemClass: `${prefixCls}-text`
      },
      swipeTime: 1000,
      bounceTime: 300,
      probeType: 3
    });
    wheel.on('scrollEnd', onScrollEnd);

    return () => {
      if (wheel) {
        wheel.off('scrollEnd', onScrollEnd);
        wheel.destroy();
      }
    };
  }, []);

  React.useEffect(() => {
    if (wheel) {
      wheel.refresh();
    }
  }, [props.updateId]);

  React.useEffect(() => {
    if (wheel) {
      wheel.wheelTo(getIndex());
    }
  }, [getIndex()]);

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