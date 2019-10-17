import { Touched } from '../types'

/**
 * make field touched
 * @param values state object
 */
export function touchAll<T>(values: T): Touched<T> {
  const touched = {} as any
  for (let key in values) {
    const value = values[key]
    touched[key] = typeof value === 'object' && value !== null ? touchAll(value) : true
  }
  return touched
}
