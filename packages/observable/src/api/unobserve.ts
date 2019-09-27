import { globalState } from '../core/globalState'
import { Reaction } from '../typings'

export function unobserve(reaction: Reaction): any {
  const { runners } = globalState

  for (let index = 0; index < runners.length; index++) {
    if (runners[index].reaction === reaction) {
      runners.splice(index, 1)
    }
  }
}
