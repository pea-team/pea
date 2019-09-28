---
id: ts
title: 使用 TypeScript
sidebar_label: 使用 TypeScript
---

`@peajs/store` 对 TypeScript 有着非常良好的支持，通常有三种方式确定 store 的类型:

## 自动类型推到

如果不给 store 定义类型，会使用 TypeScript 的自动类型推导。

```js
const store = createStore({
  count: 10,
  name: 'Pea',
})
```

这个 store 类型会自动推导为：

```js
interface Store {
  count: number
  name: string

}
```

## 使用 TypeScript 的 `as` 用法

```js
interface Todo {
  id: number
  title: string
}

const store = createStore({
  todos: [] as Todo[]
})
```

上面 store 的 todos 的初始值虽然为 `[]`，但它的类型为 `Todo[]`

## 使用泛型

你也可以通过泛型，完整定义 store 的类型：

```jsx
interface Store {
  count: number
  name?: string
  increment: () => void
  asyncIncrement: () => Promise<void>
}

const store = createStore<Store>({
  count: 10,
  increment() {
    store.count++
  },
  async asyncIncrement() {
    store.count++
  },
})
```
