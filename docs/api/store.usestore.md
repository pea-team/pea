# store.useStore

使用 React hooks 的方式获取 state，为了获得更好的性能，尽量减少 re-render，需要使用 state selector，例如：`S => S.count`、`S => S`。使用 React hooks，你不要写任何 TypeScript type 就可以得到完整的智能提示。

```javascript
const App = () => {
  const { useStore } = counterStore
  const count = useStore(S => S.count)
  return <span>{count}</span>
}
```

