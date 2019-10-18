import { HandlerBuilder } from './HandlerBuilder'
import { State, Handlers, Actions } from './types'

export type Creator = <T>({
  handlerBuilder,
  state,
  handlers,
  actions,
}: {
  handlerBuilder: HandlerBuilder<T>
  state: State<T>
  handlers: Handlers
  actions: Actions<T>
}) => any

type Name = 'Form' | 'Field' | 'ErrorMessage'

export class PeaForm {
  static formCreator: any = null
  static fieldCreator: any = null
  static errorMessageCreator: any = null
  /**
   *
   * @param name Component Name
   * @param creator function to override Component
   */
  static register(name: Name, creator: Creator) {
    // override Form
    if (name === 'Form') {
      PeaForm.formCreator = creator
    }
    // override Field
    if (name === 'Field') {
      PeaForm.fieldCreator = creator
    }

    // override ErrorMessage
    if (name === 'ErrorMessage') {
      PeaForm.errorMessageCreator = creator
    }
  }
}
