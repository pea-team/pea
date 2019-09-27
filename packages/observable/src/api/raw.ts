import { globalState } from '../core/globalState'
export function raw<T extends object>(obj: T) {
  return globalState.raws.get(obj)
}
