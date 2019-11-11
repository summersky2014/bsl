import * as React from 'react';
import * as ReactDOM from 'react-dom';

import axios from 'axios';
import BSL from '../../../../../../typings';
import RequestView from '../../../../../../components/RequestView';
import { LoadingView, EmptyView, TimeoutView, FailView } from '../../../../../../components/StateView';
import '../../../../../../styles/normalize.scss';
import '../../../../../../styles/bsl.scss';

// 将请求结果转换为内置格式
axios.defaults.transformResponse = (data: string, headers) => {
  if (headers['content-type'].indexOf('application/json') >= 0) {
    const result = JSON.parse(data);
    const response: BSL.RequestResponse<any> = {
      data: result,
      code: 200,
      msg: ''
    };

    return response;
  }
};

const Demo = () => {
  return (
    <div>
      <RequestView api="https://registry.npm.taobao.org/bsl">
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
