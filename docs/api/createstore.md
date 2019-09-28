# createStore

```javascript
const { useStore, dispatch, query, fetch } = createStore({
  state: {},
  reducers: {},
  affects: {},
})
```

`state:any`

初始化的 state，建议给 state 定义类型，当然这不是必须的，不定义类型会自动推倒出 state 的类型。

```typescript
interface State {
  count: number
  step?: number
}

const initialState: State = { count: 0 } as State
const someStore = createStore({ state: initialState })
```

`reducers: { [string]: (state, payload) => any }`

Dahalia 中有两种类型的 action：reducer 和 effect，你只能通过 reducers 里面的 action 更新 state，如果是要在 action 中进行副作用操作，请使用 effects。

```javascript
const someStore = createStore({
  reducers: {
    increment(state, step) {
      state.count += step
    },
  },
})
```

`effects: { [string]: (payload) => any }`

如果是要在 action 中进行副作用操作，请使用 effects，比如异步网络请求、定时器等。需要改变 state，你需要 dispatch 一个 action 。

```javascript
const { dispatch } = createStore({
  effects: {
    async asyncIncrement() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      dispatch(A => A.increment)
    },
  },
})
```

