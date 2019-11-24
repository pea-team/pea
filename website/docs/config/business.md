---
id: business
title: 业务配置
sidebar_label: 业务配置
---

配置和插件，是 `peajs` 重要的两部分，而配置又分为 **业务配置** 和 **构建配置** 两类：

- `src/config/config.ts` - 业务配置，一般用来放置业务代码的一些公用配置;
- `peajs.config.ts` - 构建配置，用来配置项目插件、webpack 配置、打包配置等;

业务配置比较简单，我们先看业务配置，下面业务配置文件的示例:

**src/config/config.ts**

```js
const config = {
  isDev: process.env.NODE_ENV === 'development',
  host: 'http://127.0.0.1:5001',
  rest: {
    endpoint: config.isDev ? 'http://127.0.0.1:5001' : 'http://server.com',
  },
  graphql: {
    endpoint: 'http://127.0.0.1:5001/graphql',
  },
}

export default config
```

## 读取业务配置

业务配置会自动加载到 `Pea` 对象中，所以你可以直接在 `Pea.config` 对象中读取配置:

```js
import Pea from '@peajs/core'

const myConfig = Pea.config

console.log(myConfig.isDev)
console.log(myConfig.host)
console.log(myConfig.rest.endpoint)
```

当然你可以直接在项目中引入配置文件，但 `peajs` 建议在 `Pea` 读取配置，特别是配合一些插件使用时，这会非常有用。

## 更新业务配置

你可以使用 `Pea.updateConfig` 更新业务配置：

```js
import Pea from '@peajs/core'

Pea.updateConfig({ host: 'http://127.0.0.1:8000' })
```

`Pea.updateConfig` 的参数为需修改的配置，它会自动合并到 `Pea.config` 对象中，类似 React 的 `setState`。
