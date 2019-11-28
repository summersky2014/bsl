# 配置路由

在<code>app/routes.ts</code>中配置路由。

键名: 为页面的中文名称。

base: 路由基础地址，是一个字符串常量。

component: 页面组件。

pathParams: 为页面的参数，值是一个字符串数组，会组合在<code>base</code>后面。

示例: <code>const linkParams: (keyof Match)[] =  ['params', 'type', 'request'];</code>

linkParams: 配合<code>pathParams</code>使用的，值为一个带参数的函数，返回值同<code>pathParams</code>

示例:

<pre>
 linkParams: (
    merchantId: string | number,
    skuId: string | number,
    requestId: string | number,
    /** 购买数量 */
    number: number,
    type: 1 | 0,
    request: 1 | 2
  ) => [encodeURIComponent(JSON.stringify([{ merchantId, requestId, skuId, number }])), type, request]
</pre>

## 跳转路由

跳转路由使用<code><Link></code>组件，如果目标页面有<code>pathParams</code>则要用<code><Link></code>组件的
<code>query</code>参数来跳转。

示例:
<pre>
Link.go({
  url: routes['确认订单'].base,
  query: routes['确认订单'].linkParams!(props.goodsSpuDetail.merchantId, SelGoodsSkuInfo.goodsSkuId, SelGoodsSkuInfo.goodsSkuId, parseInt(newSelectedGoodsCount), 1, 2)
});
</pre>
