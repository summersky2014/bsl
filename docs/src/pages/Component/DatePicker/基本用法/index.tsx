import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Subscription, updateLoop } from '../../../../../../app/Scheduler';
import DatePicker, { DatePickerHelper } from '../../../../../../components/DatePicker';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';


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
  const yymmddHelper = React.useMemo(() => new DatePickerHelper(), []);

  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <div>
      <h2>年月日选择</h2>
      <DatePicker
        value={yymmddHelper.getValue()}
        onChange={yymmddHelper.onChange}
        state={yymmddHelper.state}
        mode="yyMMdd"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
