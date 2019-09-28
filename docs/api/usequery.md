# useQuery

## useQuery

`const { loading, data, error, refetch } = useQuery(query, variables, options)`

获取服务端数据是一个非常通用的业务场景，这个一个重复而繁杂的工作，`useQuery` 把这个业务逻辑通用化了，通过 `useQuery`，你可以用最简单的方式获取数据，并且可以方便的处理加载状态和错误信息。

### Params

`query: string`

GraphQL 的 query 字符串，例如：

```javascript
{
  hero {
    name
  }
}
```

`variables?: {[key: string]: any}`

GraphQL 查询的变量，是一个普通的 JavaScript 对象，例如：

```javascript
{
  id: 1000
}
```

`options?:TODO:`

其他参数，是一个普通的 JavaScript 对象，例如:

```javascript
{
  headers: {
    token: '57bb44dd21d2befb7ca3f010'
  }
}
```

### Result

`loading: boolean`

请求状态，是否成功获取数据，对前端界面状态处理很有用。

`data: TData`

GraphQL 查询成功返回的数据对象，例如：

```javascript
{
  hero: {
    name: 'Cristiano Ronaldo'
  }
}
```

`error: TError`

请求发生错误时，返回的错误信息对象，例如：

```javascript
{
  error: {
    statusCode: 401,
    error: "Unauthorized",
    message: "未登录"
  }
}
```

`refetch: (variables?: TVariables) => void`

一个函数，可以让你重新发请求获取数据，比如你有一刷新按钮，点击重新获取数据，你就可以用 refetch 了。

使用 React hooks 的方式获取 state，为了获得更好的性能，尽量减少 re-render，需要使用 state selector，例如：`S => S.count`、`S => S`。使用 React hooks，你不要写任何 TypeScript type 就可以得到完整的智能提示。

```javascript
const App = () => {
  const { useStore } = counterStore
  const count = useStore(S => S.count)
  return <span>{count}</span>
}
```

## store.dispatch

Dispatch 一个 action 用来更新 state，`dispatch` 接受一个 action selector\(类似 state selector\)，而不是 Redux 使用的字符串标量，这样的好处是：智能提示、精确的跳转到定义，可以有更好的开发体验和代码可维护性。

```javascript
const App = () => {
  const { dispatch } = counterStore
  return <button onClick={() => dispatch(A => A.decrement)}>-</button>
}
```

## store.query

```javascript
TODO:
```

## store.fetch

```javascript
TODO:
```

