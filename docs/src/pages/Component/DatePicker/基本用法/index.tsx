import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import DatePicker, { DatePickerHelper } from '../../../../../../components/DatePicker';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const App = () => {
  return (
    <Subscription source={{}}>
      {(value: object) => (
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
    dispatch();
  }, []);

  return (
    <div>
      <h2>年月日选择</h2>
      <DatePicker
        value={yymmddHelper.value.get()}
        onChange={yymmddHelper.onChange}
        state={yymmddHelper.state}
        mode="yyMMdd"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
