import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subscription, Context, dispatch } from '../../../../../../app/Scheduler';
import Upload from '../../../../../../components/Upload';
import Toast from '../../../../../../components/Toast';
import useProgress from '../../../../../../components/Upload/useProgress';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

const style = {
  container: {
    margin: 20
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
  const [process, setProcess] = React.useState(0);
  const [onUploadProgress] = useProgress();
  const formData = React.useMemo(() => new FormData(), []);
  // demo演示时需要的代码，实际项目中已配置好，不需要此段代码
  React.useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <Upload
        style={style.container}
        process={process}
        mode="image"
        onChange={(e, file, compressSrc, blob) => {
          formData.append('file', blob!, file.name);
          onUploadProgress({
            api: "https://api.apiopen.top/getJoke",
            data: formData,
            onUploadProgress(p) {
              setProcess(p);
            },
            onComplete(res: any) {
              Toast.show('已完成', 'complete');
            }
          });
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
