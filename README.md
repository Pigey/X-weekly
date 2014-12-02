X-weekly
========

基于[X](https://github.com/nighca/X) & [X-client](https://github.com/nighca/X-client) 开发的一个周报系统

## 开发

### html部分

页面源代码在`html/common`（公共部分）及`html/page`（各页面主体）下，通过`html/build.js`（一个很简单的模板引擎）构建，在`html/`下生成结果文件，`html/page`中每个文件将对应生成一个同名文件。

	node html/build.js

### js

* 安装依赖

		bower install

* 注意

	* 页面中的`$`不是jQuery！是一个简单的[DOM操作工具](https://github.com/nighca/lib)，API可以看源码（`dep/stupid-lib/lib.js`）。

	* `X`是后端存储服务框架的前端接口，源码位置在`dep/x-client/dist/X.js`，所有关于Model的增删查改操作需要在`X.ready(function(){...})`中执行。

### css

样式使用less编写，代码在`less/`下，转换后为`css/`下的同名（后缀名不一样）文件。

### 部署服务

静态serve代码目录，在浏览器中打开`index.html`该文件即可

数据通过[X](https://github.com/nighca/X)服务存储在104.236.176.244，accessToken为`a1943f0a9991c7279b93ea8fa57d3cdf`
