import { observable, observe } from '../src'

test('observable', () => {
  let count: number = 0
  const store = observable({
    count: 1,
    increment() {
      store.count++
    },
  })

  observe(() => (count = store.count))
  expect(count).toBe(1)
  store.increment()
  expect(count).toBe(2)
})
