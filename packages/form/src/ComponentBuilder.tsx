import React, { FC, Fragment, createElement } from 'react'
import { PeaForm } from './PeaForm'
import { HandlerBuilder } from './HandlerBuilder'
import get from 'lodash.get'
import { State, FieldProps, ErrorMessageProps, Handlers, Actions } from './types'

export class ComponentBuilder<T> {
  constructor(
    private handlerBuilder: HandlerBuilder<T>,
    private state: State<T>,
    private handlers: Handlers,
    private actions: Actions<T>,
  ) {}

  createErrorMessage() {
    const ErrorMessage: FC<ErrorMessageProps<T>> = props => {
      const { name, children, component = 'div', ...rest } = props
      const { errors, touched } = this.state
      if (!touched[name] && !errors[name]) return null
      // TODO: handle any
      const error: any = errors[name]

      if (children && typeof children === 'function') {
        return <Fragment>{children(error)}</Fragment>
      }

      return <Fragment>{createElement(component, rest as any, error)}</Fragment>
    }

    ErrorMessage.defaultProps = {
      className: 'pea-form-field-error',
      component: 'div',
    }

    return ErrorMessage
  }

  createForm() {
    const Form: FC = props => {
      return <form {...props} onSubmit={this.handlers.handleSubmit} />
    }
    return Form
  }

  createField<F>(): FC<FieldProps & F> {
    const { handlerBuilder, state, handlers, actions } = this
    let CustomField: any

    if (PeaForm.fieldCreator) {
      CustomField = PeaForm.fieldCreator({ handlerBuilder, state, handlers, actions })
    }

    const Field: FC<FieldProps & F> = props => {
      const { name, children, origin } = props

      // use custom if not origin
      if (PeaForm.fieldCreator && !origin) {
        return <CustomField {...props} />
      }

      const { values } = state
      const field: any = {
        name,
        onChange: handlerBuilder.createChangeHandler(name),
        onBlur: handlerBuilder.createBlurHandler(),
      }

      if (!children) return null

      if (typeof children === 'function') {
        throw new Error('function children is not allow')
      }

      const { type, value } = children.props

      if (type === 'radio') {
        field.checked = value === get(state.values, name)
      } else if (type === 'checkbox') {
        field.checked = get(state.values, name).includes(value)
      } else {
        field.value = values[name]
      }

      return React.cloneElement(children, { ...field })
    }
    return Field
  }
}
