import { observable, isObservable } from '../src'

test('observable', () => {
  const store = observable({
    count: 1,
    increment() {
      store.count++
    },
  })

  expect(store.count).toBe(1)
  store.increment()
  expect(store.count).toBe(2)
})

test('isObservable', () => {
  const store = observable({
    count: 1,
    increment() {
      store.count++
    },
  })

  expect(isObservable(store)).toBe(true)
})
