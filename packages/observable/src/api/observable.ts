import { canObservable } from '../utils/canObservable'
import { action } from './action'
import { globalState } from '../core/globalState'
import { invokeRunners } from '../core/invokeRunners'

export function observable<T extends object>(obj: T): T
export function observable<T extends object>(obj: T, root?: boolean): T

export function observable<T extends object>(obj: T, root?: boolean) {
  if (root === undefined) root = true

  if (!canObservable(obj)) return obj

  const object: T = globalState.proxies.get(obj) || toObservable(obj, root)
  return object
}

export function toObservable<T extends object>(obj: T, init: boolean) {
  // TODO: too hack
  const objAny: any = obj
  if (init) {
    const fnKeys = Object.keys(objAny).reduce(
      (result, key) => (typeof objAny[key] === 'function' ? [...result, key] : result),
      [] as string[],
    )

    for (const key of fnKeys) {
      const fn = objAny[key]
      objAny[key] = new Proxy(fn, {
        apply: async (target, thisArgs, argArray) => {
          return await action(() => Reflect.apply(target, thisArgs, argArray))
        },
      })
    }
  }

  const observable: T = new Proxy(objAny, handler)

  globalState.proxies.set(objAny, observable)
  globalState.raws.set(observable, objAny)
  return observable
}

export const handler: ProxyHandler<any> = {
  get(target, key, receiver) {
    globalState.collections.set(target, key)
    const value = Reflect.get(target, key, receiver)
    const observableValue = globalState.proxies.get(value)

    if (typeof value === 'object') {
      return observableValue ? observableValue : observable(value, false)
    }
    return value
  },

  set(target, key, value, receiver) {
    const oldValue = Reflect.get(target, key, receiver)
    const result = Reflect.set(target, key, value, receiver)

    if (globalState.collections.get(target) || value !== oldValue) {
      invokeRunners()
    }

    return result
  },

  deleteProperty(target, key) {
    const hasKey = Reflect.has(target, key)
    const result = Reflect.deleteProperty(target, key)

    if (hasKey) invokeRunners()

    return result
  },
}
