import BSL from '../../typings';
import * as React from 'react';
import Item, { Base as ItemBase , Data, itemHeight, num, Value } from './Item';
import variable from '../../utils/variable';
import './index.scss';

export interface Base extends ItemBase {
  /** 在onScollEnd后触发，用于判断哪些列需要保持原来的选中索引，哪些列需要初始化为0 */
  // formatSelectedCol?: (currentCol: number, value: Value[]) => number[];
  /** 是否级联 */
  cascade?: boolean;
  updateId: number;
}

export interface Props extends BSL.ComponentProps, Base {
  /** 当是级联的时候是一维数组，否则是对象二维数组 */
  data: Data[] | Data[][];
  value: Value[];
  onScrollEnd?: (currentCol: number, currentValue: Value, allValue: Value[]) => void;
  /** 组件创建成功后执行 */
  onCreate?: (data: Data[][]) => void;
}

/** 设置格式化后的数据 */
function formatData(stateData: Data[][], value: Value[], propsData: Data[], startCol = 0): Data[][] {
  const newData: Data[][] = stateData;
  const each = (eachData: Data[]) => {
    // 判断数据是否为空
    if (eachData === undefined || (eachData.length === 0)) {
      return;
    } else {
      const selectedIndex = value[startCol] ? eachData.findIndex((item) => item.value === value[startCol].value) : 0;
      let selectedData = eachData[selectedIndex] as Data | undefined;

      // 如果selectedData不存在就取索引为0的数据
      if (selectedData === undefined) {
        selectedData = eachData[0];
      }
      const children = selectedData.children;
      newData[startCol] = [];

      for (let i = 0; i < eachData.length; i++) {
        newData[startCol].push(eachData[i]);
      }
      startCol++;
      each(children as Data[]);
    }
  };

  // 如果是第一列就先初始化
  if (startCol === 0) {
    newData[0] = [];
    for (let i = 0; i < propsData.length; i++) {
      const dataitem = propsData[i];
      const selectedIndex = value[0] ? propsData.findIndex((item) => item.value === value[0].value) : 0;
      newData[0].push(dataitem);

      // 找到第一列被选中的项，把他的children拿去递归
      if (selectedIndex === i && dataitem.children) {
        startCol++;
        each(dataitem.children);
      }
    }
  } else {
    each(newData[startCol]);
  }

  return newData;
}

/** 根据是否是级联，来确定是否要格式化数据 */
function switchData(cascade: Props['cascade'], stateData: Data[][], value: Value[], propsData: Props['data'], startCol: number): Data[][] {
  if (variable.env === 'development') {
    if (propsData.length && (propsData as Data[][])[0]) {
      if (cascade && (propsData as Data[][])[0].length >= 0) {
        console.error('级联模式下data只能是一维数组', propsData);
      }

      if (!cascade && typeof (propsData as Data[][])[0][0] === 'undefined') {
        console.error('非级联模式下data只能是二维数组', propsData);
      }
    }
  }
  if (cascade) {
    return formatData(stateData, value, propsData as Data[], startCol);
  } else {
    return propsData as Data[][];
  }
}

const prefixCls = 'bsl-picker';
function Panel(props: Props) {
  const { className, id, style, itemCls, textCls, updateId, onCreate, onScrollEnd, _datepicker } = props;
  const propsValue = React.useRef(props.value);
  /** 是否将选择归零 */
  const isReturnTozero = props.cascade && !_datepicker;
  let data = React.useMemo(() => switchData(props.cascade, [], props.value, props.data, 0), [updateId]);

  React.useEffect(() => {
    if (onCreate) {
      onCreate(data);
    }
  }, []);

  React.useEffect(() => {
    propsValue.current = props.value;
  }, [props.value]);

  return (
    <div
      className={className}
      id={id}
      style={style}
    >
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}-mask`} style={{ backgroundSize: `100% ${itemHeight * num}px` }} />
        <div className={`${prefixCls}-indicator`} style={{ top: `${itemHeight * num}px` }} />
        <div className={`${prefixCls}-content`}>
          {data.map((item, col) => (
            <Item
              key={col}
              data={item}
              updateId={props.cascade !== true || col === 0 ? 0 : (props.value[col - 1] ? props.value[col - 1].value : col)}
              _datepicker={props.cascade && _datepicker}
              value={props.value[col]}
              itemCls={itemCls}
              textCls={textCls}
              onScrollEnd={(currentValue, selectIndex) => {
                const newValue = JSON.parse(JSON.stringify(propsValue.current));
                newValue[col] = currentValue;
                data = switchData(props.cascade, data, newValue, props.data, col);

                // if (formatSelectedCol) {
                //   const indexs = formatSelectedCol(col, newValue);
                //   indexs.forEach((selectIndexValue, i) => {
                //     newValue[i] = {
                //       label: data[i][selectIndexValue].label,
                //       value: data[i][selectIndexValue].value
                //     };
                //   });
                // }
                if (isReturnTozero) {
                  // 将currentCol后续的列初始化为0，重置子项列表的选中项
                  for (let i = col + 1; i < data.length; i++) {
                    newValue[i] = {
                      label: data[i][0].label,
                      value: data[i][0].value
                    };
                  }
                }

                if (onScrollEnd) {
                  onScrollEnd(col, currentValue, newValue);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Panel;
