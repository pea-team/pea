import { globalState } from '../core/globalState'

export function canObservable(obj: any = {}): boolean {
  if (obj === null) return false
  if (typeof obj === 'function') return false
  if (globalState.raws.has(obj)) return false
  return true
}
