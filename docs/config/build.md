---
id: build
title: 构建配置
sidebar_label: 构建配置
---

顾名思义，构建配置会影响 `peajs` 的构建过程，构建配置在根目录中 `peajs.config.ts`，构建配置示例：

```js
import { PeaConfig } from '@peajs/types'
import RouterPlugin from 'pea-plugin-router'
import AntdPlugin from 'pea-plugin-antd'
import LessPlugin from 'pea-plugin-less'
import ModalPlugin from 'pea-plugin-modal'

const config: PeaConfig = {
  title: 'peajs',
  buildDir: 'dist',
  plugins: [
    new RouterPlugin(),
    new LessPlugin({ javascriptEnabled: true }),
    new AntdPlugin(),
    new ModalPlugin(),
  ],
}
export default config
```

配置的完整类型定义： [PeaConfig types](https://github.com/pea-team/pea/blob/b1708ab3fc6ad51e1da7bbf7759b2fff84e3ee74/packages/types/src/index.ts#L12-L18)

构建配置中最重要的配置是 **插件配置**，插件的详细使用请看 [peajs 插件](/docs/plugin/intro)。
