import { globalState } from '../core/globalState'
import { isPromise } from '../utils/isPromise'
import { ActionFn } from '../typings'

export async function action(fn: ActionFn) {
  globalState.actionPendingCount++
  const result = fn()
  if (isPromise(result)) {
    const data = await result
    globalState.actionPendingCount--
    return data
  } else {
    globalState.actionPendingCount--
    return result
  }
}
