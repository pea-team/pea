---
id: plugin
title: 路由插件
sidebar_label: 路由插件
---

`peajs` 是一个插件化的框架，`peajs` 提供了路由插件 `pea-plugin-router` 让你方便快速地使用路由。

## 配置路由插件

使用路由插件非常简单，在配置文件 `pea.config.ts` 配置即可。

在配置之前你需要先安装：

```bash
npm i pea-plugin-router @peajs/router
```

`pea.config.ts`

```js
import { PeaConfig } from '@peajs/types'
import RouterPlugin from 'pea-plugin-router'

const config: PeaConfig = {
  plugins: [new RouterPlugin()],
}

export default config
```

## 模式模式

`peajs` 提供了两种路由模式：**约定式路由** 和 **配置式路由**。

## 使用路由

配置好插件后，如何使用路由功能呢？建议你从 **约定式路由** 开始：

开始使用 [**约定式路由**](/docs/router/convention)。
