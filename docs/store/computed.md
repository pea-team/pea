---
id: computed
title: computed
sidebar_label: computed
---

类似Mobx，@peajs/store 也可以使用计算值 (computed):

```jsx
import React from 'react'
import { createStore, observe } from '@peajs/store'

const store = createStore({
  numbers: [1, 2, 3, 4],
  get len() {
    return store.numbers.length
  },
})

export default observe(() => (
  <div>
    <span>Length: {store.len}</span>
  </div>
))
```
