import * as React from 'react';
import * as ReactDOM from 'react-dom';

import axios from 'axios';
import BSL from '../../../../../../typings';
import RequestView from '../../../../../../components/RequestView';
import '../../../../../../styles/base.scss';

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
            <RequestView.Loading>加载中...</RequestView.Loading>
            <RequestView.Complete>加载成功：{JSON.stringify(data._id)}</RequestView.Complete>
            <RequestView.Fail>加载失败</RequestView.Fail>
          </React.Fragment>
        )}
      </RequestView>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
