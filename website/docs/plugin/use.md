---
id: use
title: 使用插件
sidebar_label: 使用插件
---

插件机制 `peajs` 最重要的机制之一，为什么需要插件机制呢？在 `peajs` 中，插件最大作用是把业务无关的代码独立出去，让我们更专注于业务开发。

## 配置插件

插件是一个 JS 模块，通常插件是一个 npm 模块，我们使用 npm 安装它：

```bash
npm i pea-plugin-less
```

在构建配置文件 `pea.config.ts` 配置：

```js
// pea.config.ts
import { PeaConfig } from '@peajs/types'
import LessPlugin from 'pea-plugin-less'

const config: PeaConfig = {
  plugins: [new LessPlugin({ javascriptEnabled: true })],
}
export default config
```

`peajs` 默认是不支持使用 less，使用 `pea-plugin-less` 插件后，就可以是使用 less 了：

```jsx
import React from 'react'

import './button.less'

const Button = () => <button>Error Button</button>
```

## 插件和业务配置
