import { globalState } from './globalState'

export function invokeRunners() {
  if (globalState.enforceActions && globalState.actionPendingCount === 0) {
    throw new Error('Please use Actions to update observable value')
  }

  for (const { reaction, scheduler } of globalState.runners) {
    scheduler ? scheduler(reaction) : reaction()
  }
}
