---
id: started
title: 基本使用
sidebar_label: 基本使用
---

`@peajs/store` 核心 API 只有两个: createStore 和 observe， 从`@peajs/store`中引入，最简单用法：

```jsx
import React from 'react'
import { createStore, observe } from '@peajs/store'

const store = createStore({
  count: 10,
  increment() {
    store.count++
  },
})

export default observe(() => (
  <div>
    <span>{store.count}</span>
    <button onClick={store.increment}>+</button>
  </div>
))
```

记住 3 个使用规则:

- 使用`createStore` 创建一个 store，store 包含了 state 和 action
- 使用 observe 包装组件，这样如果 state 更新，组件回自动重新渲染
- 只能在 action 中修改 state，直接修改会报错

## createStore

使用 `createStore` 创建一个 Store:

```js
const store = createStore({
  // state
  count: 10,

  // action: increment
  increment() {
    store.count++
  },
})
```

普通的属性为 state，函数属性为 action。

只能在 action 内修改 state ：

```js
store.count = store.count + 1 // 不在 action 内，会报错

store.increment() // 在 action内，可以更新 state
```

## observe

自动更新 ui 关键是 `observe`：

```jsx
export default observe(() => (
  <div>
    <span>{store.count}</span>
    <button onClick={store.increment}>+</button>
  </div>
))

// or

const Counter = () => (
  <div>
    <span>{store.count}</span>
    <button onClick={store.increment}>+</button>
  </div>
)
export default observe(Counter)
```
