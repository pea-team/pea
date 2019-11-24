---
id: intro
title: 简介
sidebar_label: 简介
---

Pea 有自己的状态管理方案，我们叫它 `@peajs/store`，在介绍它之前，我们先来看看 React 官方推荐并且最简单的状态管理方案，我觉得是 hooks 版本的 useState，它是这样用的：

```jsx
import React, { useState } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

非常好理解，核心只有两样东西：state 和 action，state 用来渲染 ui，action 用来更新 state，没有其他多余的东西，没有复杂的概念。

我理想中的状态管理库是这样:

- Api 足够简单，尽量引入少的概念
- 易用性高，使用者易用上手，较少的冗余代码
- 能让使用者更容易的写出可维护性高的代码
- 较高地开发效率
- 能让业务代码有良好地组织方式
- 完美地支持 Typescript

因此，根据这些想要的特性，便有了 `@peajs/store`。和官方推荐的解决方案类似，核心只有 state 和 action，核心 API 只有两个：createStore 和 observe。


如何使用呢？请看 [Get Started](/docs/store/started)。