import * as React from 'react';
import * as classNames from 'classnames';
import { css } from 'aphrodite/no-important';
import styles from './style';

import Panel, { Base as PanelBase, Props as PanelProps } from './Panel';
import { Value, Data } from './Item';
import Popup from '../Popup';
import Helper from './Helper';
import { FromTypeProps } from '../Form';
import Icon from '../Icon';
import variable from '../../utils/variable';

const rightSvg = variable.svgRootPath + require('../../assets/rightArrow.svg').id;

export interface Base extends PanelBase {
  /** 点击弹出Picker的按钮的样式 */
  buttonCls?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 取消和确定之间的标题 */
  title?: string;
  /** 当picker弹出来时 */
  onPopup?: () => void;
}

export interface DefaultProps {
  /** 取消的文本 */
  dismissText?: string;
  /** 确定的文本 */
  okText?: string;
  /** 占位字符 */
  placeholder?: string;
  /** 格式化显示的文本 */
  format?: (value: Value[]) => string;
  /** 是否在按钮上显示向右的箭头 */
  rightIcon?: boolean;
}

export interface Props extends Base, DefaultProps, FromTypeProps<PanelProps['value']> {
  data: PanelProps['data'];
}

/**
 * 索引超过数据长度时使用，仅用于非级联的模式
 * 如果索引超出数据的长度，就取数据最后一位
 */
function getValueWhenOverDataLength(props: Props, stateValue: Value[]): Value[] | null {
  const data = props.data as Data[][];
  const value = props.value;
  const newAllValue: Value[] = [];

  for (let i = 0; i < data.length; i++) {
    const group = data[i];
    if (value.length === 0) {
      newAllValue[i] = {
        label: data[i][0].label,
        value: data[i][0].value
      };
    } else if (value[i]) {
      const index = group.findIndex((item) => item.value === value[i].value);
      if (index === -1) {
        newAllValue[i] = {
          label: data[i][0].label,
          value: data[i][0].value
        };
      } else {
        const newValue = data[i][index];
        newAllValue[i] = {
          label: newValue.label,
          value: newValue.value
        };
      }
    }
  }

  // 当新值和旧值不一致时才去触发changeValue
  if (newAllValue.length && newAllValue.toString() !== stateValue.toString()) {
    return newAllValue;
  }

  return null;
}

const defaultProps: Required<DefaultProps> = {
  rightIcon: true,
  dismissText: '取消',
  okText: '确定',
  placeholder: '请选择',
  format: (value) => value.map((item) => item.label).join(',')
};

function initCascadeData(props: Props) {
  const newAllValue: Value[] = [];

  const each = (data: Data, index: number) => {
    newAllValue[index] = {
      value: data.value,
      label: data.label
    };

    if (data.children && data.children.length) {
      each(data.children[0], ++index);
    }
  };

  each((props.data as Data[])[0], 0);
  return newAllValue;
}

function Picker(props: Props) {
  const { updateId, dismissText, okText, title, placeholder, buttonCls, onPopup, disabled, rightIcon } = props;
  const [visible, setVisible] = React.useState(false);
  const stateValue = React.useMemo(() => {
    return {
      current: props.value.length ? JSON.parse(JSON.stringify(props.value)) : initCascadeData(props)
    };
  }, [props.value]);
  const [, setNow] = React.useState(0);
  const value = props.value;
  const format = props.format as Required<DefaultProps>['format'];
  const label = value.length ? format(props.value) : placeholder;
  const update = () => {
    setNow(Date.now());
  };
  let foramtData: Data[][];
  const onScrollEnd = (currentCol: number, currentValue: Value, allValue: Value[]) => {
    stateValue.current = allValue;
    
    update();
  };
  const onCreate = (data: Data[][]) => {
    foramtData = data;
  };
  const toogleVisible = () => {
    const tempVisible = !visible;
    setVisible(tempVisible);
    if (tempVisible && onPopup) {
      onPopup();
    }
  };
  const onOk = () => {
    const currentValue = stateValue.current[0].value;
    // fix: 不触发onScrollEnd时点击确认，添加默认值
    if ((currentValue === undefined || currentValue === null || currentValue === '') && foramtData) {
      const newValue: Value[] = [];
      foramtData.forEach((group) => {
        newValue.push({
          value: group[0].value,
          label: group[0].label
        });
      });
      props.onChange(newValue);
    } else {
      props.onChange(stateValue.current);
    }

    toogleVisible();
  };

  React.useEffect(() => {
    if (!props.cascade) {
      const newStateValue = getValueWhenOverDataLength(props, stateValue.current);
      if (newStateValue) {
        stateValue.current = newStateValue;
        update();
        // setStateValue(newStateValue);
      }
    }
  }, [updateId]);

  return (
    <React.Fragment>
      <div
        className={classNames(buttonCls, css(styles.button), variable.bslComponent)}
        onClick={toogleVisible}
        data-state={props.state}
        data-placeholder={!(value && value.length)}
      >
        <div
          className={classNames(css(styles.label), variable.bslComponent)}
          data-disabled={disabled}
          data-placeholder={!(value && value.length)}
        >{label}</div>
        {rightIcon && <Icon className={css(styles.icon)} src={rightSvg} />}
      </div>
      <Popup
        visible={visible}
        contentCls={css(styles.popup)}
      >
        <div className={css(styles.popupHeader)}>
          <div className={css(styles.popupButton, styles.popupHeaderLeft)} onClick={toogleVisible}>{dismissText}</div>
          {title && <div className={css(styles.popupButton, styles.popupTitle)}>{title}</div>}
          <div className={css(styles.popupButton, styles.popupHeaderRight)} onClick={onOk}>{okText}</div>
        </div>
        <Panel
          {...props}
          data={props.data}
          value={stateValue.current}
          onCreate={onCreate}
          onScrollEnd={onScrollEnd}
        />
      </Popup>
    </React.Fragment>
  );
}

Picker.defaultProps = defaultProps;

export { Helper as PickerHelper };
export default Picker;