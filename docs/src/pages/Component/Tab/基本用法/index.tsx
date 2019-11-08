import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import Tab, { Value } from '../../../../../../components/Tab';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const style: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
    cursor: 'pointer'
  }
};

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

const tabData: Value[] = [{ id: '已看', value: '已看' }, { id: '未看', value: '未看' }];
const Demo = () => {
  const [value, setValue] = React.useState(tabData.slice(0, 1));

  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <Tab
        style={style.container}
        data={tabData}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <div>{value[0].value}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
