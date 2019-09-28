# store.dispatch

Dispatch 一个 action 用来更新 state，`dispatch` 接受一个 action selector\(类似 state selector\)，而不是 Redux 使用的字符串标量，这样的好处是：智能提示、精确的跳转到定义，可以有更好的开发体验和代码可维护性。

```javascript
const App = () => {
  const { dispatch } = counterStore
  return <button onClick={() => dispatch(A => A.decrement)}>-</button>
}
```

