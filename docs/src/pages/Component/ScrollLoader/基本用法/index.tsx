import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Subscription, updateLoop } from '../../../../../../app/Scheduler';
import ScrollLoader from '../../../../../../components/ScrollLoader';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';


const style: Record<string, React.CSSProperties> = {
  item: {
    padding: 12
  }
};

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
  const page = React.useRef(1);
  const data = React.useRef<any[]>([]);
  const [, setId] = React.useState(0);
  const update = () => {
    setId(Date.now());
  };

  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    updateLoop();
  }, []);
  
  return (
    <div>
      <ScrollLoader
        api="https://api.apiopen.top/getJoke"
        pageSize={20}
        sourceDataLength={data.current.length}
        params={{
          page: page.current,
          count: 20
        }}
        onLoader={() => new Promise((reslove) => {
          page.current++;
          update();
          reslove();
        })}
        onComplete={(res: any) => {
          if (data.current.length) {
            data.current.push(...res.result);
          } else {
            data.current = res.result;
          }
          update();
        }}
        onCompleteRender={data.current.map((item, i) => <div style={style.item} key={i}>{i + 1}. {item.text}</div>)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
