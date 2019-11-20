import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './index.scss';

import { Subscription, Context, updateLoop } from '../../../../../../app/Scheduler';
import Popup from '../../../../../../components/Popup';
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
  const [visible, setVisible] = React.useState(false);

  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);

  return (
    <div>
      <button style={style.button} onClick={() => setVisible(true)}>弹出层</button>
      <Popup
        contentCls={styles.popup}
        visible={visible}
        onClose={() => setVisible(false)}
        closable
      >
        <div>这里是内容</div>
      </Popup>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
