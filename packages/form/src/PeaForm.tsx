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
export interface ExcludeItem {
  propertyKey: string
  fn: any
}

export class PeaForm {
  static excludeMaps = new WeakMap<object, ExcludeItem[]>()
  static helpCreator: any = null
  static nameCreator: any = null
  static errorCreator: any = null

  static updateExcludeMaps(target: any, propertyKey: any, fn: any) {
    if (this.excludeMaps.get(target)) {
      const excludes = this.excludeMaps.get(target)
      if (excludes) {
        excludes.push({ propertyKey, fn })
      }
    } else {
      this.excludeMaps.set(target, [{ propertyKey, fn }])
    }
  }

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
