---
id: plugin
title: 插件
sidebar_label: 使用插件
---

自定义 webpack 配置，最好的是使用 plugin。

## 如何使用？

比如，你需要实现 antd 按需加载，你可以使用以下配置：

```js
import antd from 'pea-antd'

export default {
  plugins: [antd()],
}
```

使用多个插件：

```js
import less from 'pea-less'
import antd from 'pea-antd'
import antdPro from 'pea-antd-pro'
import styledJsx from 'pea-styled-jsx'

export default {
  plugins: [
    less({
      modifyVars: {
        // 'primary-color': 'red',
        // 'link-color': '#1DA57A',
        // 'border-radius-base': '10px',
      },
      javascriptEnabled: true,
    }),
    antd(),
    antdPro(),
    styledJsx(),
  ],
}
```

## 开发插件

如何开发一个插件呢？插件是一个函数，返回一个包含 webpack 和 devServer 的对象，如下:

```js
export default (options?: any) => {
  const { style = true } = options || {}
  return {
    webpack(config: webpackConfig) {
      // do something with config
      // ...

      return config
    },

    devServer(config: serverConfig) {
      // do something with config
      // ...

      return config
    },
  }
}
```

## 官方插件

- [pea-less](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-less)
- [pea-styled-components](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-styled-components)
- [pea-styled-jsx](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-styled-jsx)
- [pea-alias](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-alias)
- [pea-antd](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-antd)
- [pea-antd-pro](https://github.com/pea-team/pea-plugins/tree/master/packages/pea-antd-pro)
