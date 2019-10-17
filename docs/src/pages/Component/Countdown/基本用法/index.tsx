import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import Countdown from '../../../../../../components/Countdown';
import '../../../../../../styles/base.scss';

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
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    dispatch();
  }, []);
  
  return (
    <div>
      <Countdown
        value={60000}
        label="获取验证码"
        onClick={() => {
          // 这里可以验证电话号码的正确性和发送请求，如果为fasle就不开始倒计时
          return true;
        }}
      >
        {(time) => <div>{Math.ceil(time / 1000)}秒后重试</div>}
      </Countdown>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
