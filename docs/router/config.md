---
id: config
title: 配置式式路由
sidebar_label: 配置式式路由
---

对与复杂的应用，你可以使用配置式路由：

```js
// src/router.config.ts
import Index from '@pages/index'
import About from '@pages/about'

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/about',
    component: About,
  },
]

export default routes
```
