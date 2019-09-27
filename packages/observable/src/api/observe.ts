import { globalState } from '../core/globalState'
import { Reaction, Options, Scheduler, Runner } from '../typings'

function isLazy(options?: Options) {
  return options && options.lazy
}

function getScheduler(options?: Options): Scheduler | undefined {
  if (!options) return
  return options.scheduler
}

export function observe(reaction: Reaction, options?: Options): any {
  const scheduler = getScheduler(options)
  const { runners } = globalState
  const runner: Runner = { reaction, scheduler }

  runners.push(runner)

  if (!isLazy(options)) reaction()
  return reaction
}
