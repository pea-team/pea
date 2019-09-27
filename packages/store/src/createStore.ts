import { observable } from '@peajs/observable'

export function createStore<T extends object>(obj: T) {
  return observable(obj, true)
}
