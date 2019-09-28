---
id: async
title: 异步 Action
sidebar_label: 异步 Action
---

在 `@peajs/store` 中，异步获取数据并且改变 state 非常简单，你只需创建一个异步的 Action，异步 Action 是一个普通的 async 函数。

下面展示了一个异步获取 todo 列表的例子：

```jsx
import React from 'react'
import { createStore, observe } from '@peajs/store'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const store = createStore({
  todos: [] as Todo[],
  async fetchTodos() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const todos = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json()
    store.todos = todos
  },
})

export default observe(() => (
  <div>
    <span>
      {store.todos.map(todo => (
        <div>
          <span>{todo.title}</span>
          <span>{todo.completed}</span>p
        </div>
      ))}
    </span>
    <button onClick={store.fetchTodos}>Fetch Todos</button>
  </div>
))
```
