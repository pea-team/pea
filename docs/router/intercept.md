---
id: intercept
title: 路由拦截
sidebar_label: 路由拦截
---

有些场景，你可能在路由跳转前做一些动作:

```js
import { intercept } from '@peajs/router'

intercept((ctx, next) => {
  if (ctx.to === '/about') {
    return window.open('http://google.com')
  }
  next()
})
```

**`ctx`**

- from: string 当前 path
- to: string 目标 path

**`next()`** 被调用之后进入下一个拦截器。
