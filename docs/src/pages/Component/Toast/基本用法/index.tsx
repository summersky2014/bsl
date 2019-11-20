import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, updateLoop } from '../../../../../../app/Scheduler';
import Toast from '../../../../../../components/Toast';
import { ToastProps } from '../../../../../../components/Toast/Toast';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const style: Record<string, React.CSSProperties> = {
  button: {
    display: 'block',
    width: '100%',
    height: 50,
    margin: '12px 0',
    background: '#1890ff',
    color: '#fff'
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

const Demo = () => {
  const [type, setType] = React.useState<ToastProps['type']>(undefined);
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <div>
      <h2>声明式调用</h2>
      <button style={style.button} onClick={() => setType('complete')}>完成</button>
      <button style={style.button} onClick={() => setType('fail')}>失败</button>
      <button style={style.button} onClick={() => setType('loading')}>加载中</button>
      {type !== undefined ? (
        <Toast
          duration={1000}
          type={type}
          onClose={() => setType(undefined)}
          mask={type === 'loading'}
        >{type}</Toast>
      ) : null}

      <h2>命令式</h2>
      <button style={style.button} onClick={() => Toast.show('完成', 'complete', 1000)}>完成</button>
      <button style={style.button} onClick={() => Toast.show('失败', 'fail', 1000)}>失败</button>
      <button style={style.button} onClick={() => Toast.loading('加载中')}>加载中</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
