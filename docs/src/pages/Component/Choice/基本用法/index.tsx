import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Subscription } from '../../../../../../app/Scheduler';
import Choice, { ChoiceHelper, Value } from '../../../../../../components/Choice';
import Radio from '../../../../../../components/Radio';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';


interface Data extends Value {
  label: string;
}

const radioData: Data[] = [{ label: '男', id: 1 }, { label: '女', id: 2 }];
const checkboxData: Data[] = [{ label: '1', id: 1 }, { label: '2', id: 2 }, { label: '3', id: 3 }];
const switchData: Data[] = [{ label: '同意', id: 1 }];

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
  // 单选无默认值的
  const radioHelper = React.useMemo(() => new ChoiceHelper(), []);
  // 单选有默认值的
  const radioDefaultHelper = React.useMemo(() => new ChoiceHelper({ defaultValue: [radioData[0]] }), []);
  // 多选无默认值
  const checkboxHelper = React.useMemo(() => new ChoiceHelper(), []);
  // switch无默认值的
  const switchHelper = React.useMemo(() => new ChoiceHelper(), []);
  
  return (
    <div>
      <h2>单选(无默认值)</h2>
      <Choice
        data={radioData}
        value={radioHelper.getValue()}
        state={radioHelper.state}
        onChange={radioHelper.onChange}
        // updateId={0}
      >
        {(item, active) => <Radio active={active}>{(item as Data).label}</Radio>}
      </Choice>
      <br />

      <h2>单选(有默认值)</h2>
      <Choice
        data={radioData}
        value={radioDefaultHelper.getValue()}
        state={radioDefaultHelper.state}
        onChange={radioDefaultHelper.onChange}
        // updateId={0}
      >
        {(item, active) => <Radio active={active}>{(item as Data).label}</Radio>}
      </Choice>
      <br />

      <h2>多选(无默认值)</h2>
      <Choice
        data={checkboxData}
        value={checkboxHelper.getValue()}
        state={checkboxHelper.state}
        onChange={checkboxHelper.onChange}
        multiple
        // // 多选时updateId需要传入正确的值，才会更新界面
        // updateId={checkboxHelper.value.get().toString()}
      >
        {(item, active) => <Radio active={active}>{(item as Data).label}</Radio>}
      </Choice>
      <br />

      <h2>开关(无默认值)</h2>
      <Choice
        data={switchData}
        value={switchHelper.getValue()}
        state={switchHelper.state}
        onChange={switchHelper.onChange}
        switch
      >
        {(item, active) => <Radio active={active}>{(item as Data).label}</Radio>}
      </Choice>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
