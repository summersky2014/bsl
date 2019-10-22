# 修改组件样式

组件的<code>props</code>提供了常用的样式名，过于自定义的需求，这往往还不够。

由于库提供的<code>task</code>使用了<code>css module</code>，会对样式名进行混淆以防止重名。

所以，在项目中修改组件的样式需要一点特别的方法。

具体的介绍可以参考[这篇文章](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

## :global(.className)

拿<code>FormItem</code>组件举例，如果想修改<code>prompt</code>图标的样式，可以这么写

<pre>
  :global(.bsl-formitem-prompt) {
    width: 20px;
    height: 20px;
  }
</pre>
