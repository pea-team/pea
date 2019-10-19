import get from 'lodash.get'
import { PeaForm } from './PeaForm'
import { HandlerBuilder } from './HandlerBuilder'
import { State, Handlers, NameOptions, NameProps, Actions } from './types'

export class ToolBuilder<T> {
  setState: any
  constructor(
    private handlers: Handlers,
    private handlerBuilder: HandlerBuilder<T>,
    private state: State<T>,
    private actions: Actions<T>,
  ) {}

  createName() {
    const { state, handlers } = this
    /**
     * shortcut to bind form field with name，onChange, onBlur
     * @param name name of field
     * @param options onBlur options
     */
    return (name: string, options: NameOptions = { onBlur: true }) => {
      const props: NameProps = {
        name: name,
        value: get(state.values, name),
        onChange: handlers.handleChange,
      }
      if (options.onBlur) props.onBlur = handlers.handleBlur
      return props
    }
  }

  createError() {
    const { errors, touched } = this.state
    /**
     * shortcut to get error message
     * @param name name of field
     */
    return (name: string): any => {
      if (!touched[name] && !errors[name]) return null
      return errors[name] ? errors[name] : null
    }
  }

  createHelp() {
    /**
     * a helper
     * @param name name of field
     */
    return (name: string): any => {
      if (PeaForm.helpCreator) {
        return PeaForm.helpCreator({
          name,
          handlerBuilder: this.handlerBuilder,
          state: this.state,
          handlers: this.handlers,
          actions: this.actions,
        })
      }
      return {
        name: '',
      }
    }
  }
}
