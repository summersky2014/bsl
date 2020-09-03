import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Subscription, updateLoop } from '../../../../../../app/Scheduler';
import Picker, { PickerHelper } from '../../../../../../components/Picker';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';
import district from './district';


const colData = [
  [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' }
  ]
];

const multipleData = [
  [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' }
  ], [
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'e', value: 'e' },
    { label: 'f', value: 'f' },
    { label: 'g', value: 'g' },
    { label: 'h', value: 'h' },
    { label: 'i', value: 'i' }
  ], [
    { label: '临', value: '临' },
    { label: '兵', value: '兵' },
    { label: '斗', value: '斗' },
    { label: '者', value: '者' },
    { label: '皆', value: '皆' },
    { label: '阵', value: '阵' },
    { label: '列', value: '列' },
    { label: '在', value: '在' },
    { label: '前', value: '前' }
  ]
];

const App = () => {
  return (
    <Subscription source={{}}>
      {(value: Record<string, unknown>) => (
        <Context.Provider value={value}>
          <Demo />
        </Context.Provider>
      )}
    </Subscription>
  );
};

const Demo = () => {
  // 单行选择
  const colHelper = React.useMemo(() => new PickerHelper(), []);
  // 多行选择
  const multipleHelper = React.useMemo(() => new PickerHelper(), []);
  // 联动选择
  const cascadeHelper = React.useMemo(() => new PickerHelper(), []);
  
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <div>
      <h2>普通的1列</h2>
      <Picker
        data={colData}
        value={colHelper.getValue()}
        onChange={colHelper.onChange}
        state={colHelper.state}
      />

      <h2>普通的3列</h2>
      <Picker
        data={multipleData}
        value={multipleHelper.getValue()}
        onChange={multipleHelper.onChange}
        state={multipleHelper.state}
      />
  
      <h2>级联的3列</h2>
      <Picker
        data={district}
        cascade
        value={cascadeHelper.getValue()}
        onChange={cascadeHelper.onChange}
        state={cascadeHelper.state}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
