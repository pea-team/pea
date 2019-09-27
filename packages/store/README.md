# @peajs/store

> State management for Pea.js

## Installation

```sh
yarn add @peajs/store
```

## Quick Start

```js
import React from 'react'

import { createStore, observe } from '@peajs/store'

const store = createStore({
  count: 1,
  increment() {
    store.count++
  },
  decrement() {
    store.count--
  },
  async asyncIncrement() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    store.count++
  },
})

const App = observe(() => (
  <div>
    <span>{store.count}</span>
    <button onClick={store.decrement}>-</button>
    <button onClick={store.increment}>+</button>
    <button onClick={store.asyncIncrement}>async+</button>
  </div>
))

ReactDOM.render(<App />, document.getElementById('root'))
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
