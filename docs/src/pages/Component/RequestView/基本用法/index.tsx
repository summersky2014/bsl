import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RequestView from '../../../../../../components/RequestView';
import { EmptyView, FailView, LoadingView, TimeoutView } from '../../../../../../components/StateView';
import '../../../../../../styles/bsl.scss';
import '../../../../../../styles/normalize.scss';
import BSL from '../../../../../../typings';


// 将请求结果转换为内置格式
axios.defaults.transformResponse = (data: string, headers) => {
  if (headers['content-type'].indexOf('application/json') >= 0) {
    const result = JSON.parse(data);
    const response: BSL.RequestResponse<any> = {
      data: result,
      code: 200,
      msg: '',
      source: ''
    };

    return response;
  }
};

const Demo = () => {
  return (
    <div>
      <RequestView<any> api="https://registry.npm.taobao.org/bsl">
        {(data) => (
          <React.Fragment>
            <RequestView.Complete>
              {() => (
                <React.Fragment>
                  <div>成功视图需要用一个函数包裹起来，以防止出现data为空的情况</div>
                  <div>加载成功：{JSON.stringify(data._id)}</div>
                </React.Fragment>
              )}
            </RequestView.Complete>
            <RequestView.Loading>
              <LoadingView />
            </RequestView.Loading>
            <RequestView.Fail>
              <FailView />
            </RequestView.Fail>
            <RequestView.Empty>
              <EmptyView />
            </RequestView.Empty>
            <RequestView.Timeout>
              <TimeoutView />
            </RequestView.Timeout>
          </React.Fragment>
        )}
      </RequestView>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
