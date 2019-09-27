import { Runner } from '../typings'

class GlobalState {
  enforceActions = true

  collections = new WeakMap()

  actionPendingCount = 0

  /**
   * key: raw value
   * value: observable value
   */
  proxies = new WeakMap()

  /**
   * key: observable value
   * value: raw value
   */
  raws = new WeakMap()

  runners: Runner[] = []
}

const globalState = new GlobalState()

export { globalState }
