---
id: basic
title: 配置文件
sidebar_label: 配置文件
---

`pea-cli` 能让你快速初始化项目，但有时候你需要对 webpack、devServer 等进行扩展，这时，你可以使用 `pea.config.ts`。

## 示例

如果你需要实现 antd 按需加载，你可以使用以下配置：

关于 antd 按需加载，请看：[antd 按需加载](https://ant.design/docs/react/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)

```js
import antd from 'pea-antd'

export default {
  plugins: [antd()],
}
```

更进一步，有时你可能需要自定义 antd 样式，你可以使用以下配置：

```js
import less from 'pea-less'
import antd from 'pea-antd'

export default {
  plugins: [
    less({
      modifyVars: {
        'primary-color': 'red',
        'link-color': '#1DA57A',
        'border-radius-base': '10px',
      },
      javascriptEnabled: true,
    }),
    antd(),
  ],
}
```

## 配置项

```js
export interface Configuration {
  title?: string
  buildDir?: string
  plugins?: Plugin[]
  webpack?: (config: WebpackConfig, env?: string) => WebpackConfig
  devServer?: (config: ServerConfig) => ServerConfig
}
```

### title

页面 title，即`<head>` 标签的文字。

### buildDir

打包目标文件目录，默认为 build。

### plugins

Pea 插件，最常用的扩展 webpack 和 devServer 方式，关于插件的详细使用，请看 [使用插件](/docs/config/plugin)

#### webpack

自定义 webpack 配置，如果你想使用插件，你可以通过 `webpack` 这个配置快速自定义 webpack 配置。

用法如下：

```js
import { Configuration } from 'webpack'
import WebpackBar from 'webpackbar'

export default {
  webpack(config: Configuration, env: string) {
    // 改变 mode
    config.mode = 'production'

    // 增加一个插件
    config.plugins.push(new WebpackBar())

    // 还可以修改其他配置
    //....

    return config
  },
}
```

所有的 webpack 配置可以看官网 [webpack 配置文档](https://webpack.js.org/configuration)

### devServer

自定义 devServer 配置，如果你想使用插件，你可以通过 `devServer` 这个配置快速自定义 devServer 配置。

```js
import { Configuration } from 'webpack-dev-server'

export default {
  devServer: (config: Configuration) => {
    // 修改 server 端口号
    config.port = 4000

    // 还可以修改其他配置
    //....

    return config
  },
}
```

所有的 devServer 配置可以看官网 [devSever 配置](https://webpack.js.org/configuration/dev-server#devserver)
