import { Interceptor } from './typings'

export const interceptors: any[] = []

export function intercept(cb: Interceptor) {
  if (!interceptors.includes(cb)) {
    interceptors.push(cb)
  }
}
