# RequestView 请求视图

用于数据获取并渲染视图的场景。

## 状态

<code>RequestView</code>分为4个状态：<code>Loading</code>、<code>Complete</code>、<code>Fail</code>、<code>Empty</code>，每种状态有各自的渲染视图

## 注意

组件内部定义了响应返回的格式，如果接口返回的格式和内置格式不匹配，需要自行转换。
