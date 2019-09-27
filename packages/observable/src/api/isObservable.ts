import { globalState } from '../core/globalState'

export function isObservable<T extends object>(obj: T) {
  return globalState.raws.has(obj)
}
