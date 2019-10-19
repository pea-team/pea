import { HandlerBuilder } from './HandlerBuilder'
import { State, Handlers, Actions } from './types'

export type Creator = <T>({
  name,
  handlerBuilder,
  state,
  handlers,
  actions,
}: {
  name: string
  handlerBuilder: HandlerBuilder<T>
  state: State<T>
  handlers: Handlers
  actions: Actions<T>
}) => any

type Name = 'help' | 'name' | 'error'

export class PeaForm {
  static helpCreator: any = null
  static nameCreator: any = null
  static errorCreator: any = null
  /**
   *
   * @param toolName tool name
   * @param creator tool function to override Component
   */
  static register(toolName: Name, creator: Creator) {
    // override help
    if (toolName === 'help') {
      PeaForm.helpCreator = creator
    }
    // override name
    if (toolName === 'name') {
      PeaForm.nameCreator = creator
    }

    // override name
    if (toolName === 'name') {
      PeaForm.errorCreator = creator
    }
  }
}
