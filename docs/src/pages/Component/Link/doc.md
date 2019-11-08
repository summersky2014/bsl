# Link 链接

对<code>history</code>的封装，增强了在业务中的使用

## 声明式用法

<code>
  <Link to="跳转路由">显示的内容</Link>
</code>

<code>
  <Link to="替换的路由" replace>显示的内容</Link>
</code>

## 命令式用法

<pre>
  Link.go({ url: '跳转路由' })
  Link.replace({ url: '替换的路由' })
  // 退到上一个页面
  Link.goBack()
</pre>

## Demo

<code>Link</code>组件的demo整合到<code>PageStack </code>组件中了，[查看Demo](/#/component/pagestack)
