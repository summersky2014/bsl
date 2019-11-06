import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import Countdown from '../../../../../../components/Countdown';
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
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <h2>获取验证码</h2>
      <Countdown
        value={60000}
        label="获取验证码"
        onClick={() => {
          // 这里可以验证电话号码的正确性和发送请求，如果为fasle就不开始倒计时
          return true;
        }}
      >
        {(value) => <div>{Math.ceil(value.time / 1000)}秒后重试</div>}
      </Countdown>

      <h2>日期倒计时</h2>
      <Countdown
        value="2030-01-01"
        label="日期倒计时"
      >
        {(value) => <div>{value.day}天{value.hour}时{value.min}分{value.sec}秒</div>}
      </Countdown>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
