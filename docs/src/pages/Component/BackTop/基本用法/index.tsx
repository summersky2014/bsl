import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import BackTop from '../../../../../../components/BackTop';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const styles: Record<string, React.CSSProperties> = {
  text: {
    fontSize: 20,
    padding: 50
  },
  backTop: {
    backgroundColor: '#e77f24',
    padding: 5,
    color: '#fff',
    position: 'fixed',
    bottom: 20,
    right: 20,
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

const Demo = () => {
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <div style={styles.text}>1</div>
      <div style={styles.text}>2</div>
      <div style={styles.text}>3</div>
      <div style={styles.text}>4</div>
      <div style={styles.text}>5</div>
      <div style={styles.text}>6</div>
      <div style={styles.text}>7</div>
      <div style={styles.text}>8</div>
      <div style={styles.text}>9</div>
      <div style={styles.text}>10</div>
      <div style={styles.text}>11</div>
      <div style={styles.text}>12</div>
      <div style={styles.text}>13</div>
      <BackTop style={styles.backTop}>
        <div>回到顶部</div>
      </BackTop>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
