---
id: started
title: 基本使用
sidebar_label: 基本使用
---

## 开始使用

`@peajs/store` 核心 API 只有一个: `userStore`， 从`@peajs/store`中引入，最简单用法：

```tsx
import React from 'react'
import { useStore } from '@peajs/store'

export default () => {
  const [count, setCount] = useStore < number > ('COUNTER', 0)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```
