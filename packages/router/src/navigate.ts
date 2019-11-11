import { mutate } from 'stook'
import { PEA_ROUTER } from './constant'
import { updateRouterState } from './util'
import { State } from './typings'

export function navigate(to: string, replace?: boolean) {
  mutate(PEA_ROUTER, (state: State) => {
    updateRouterState(state, to, replace)
  })
}
