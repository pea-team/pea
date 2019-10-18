import React, { ReactElement } from 'react'
import get from 'lodash.get'
import { State } from '../types'
import { HandlerBuilder } from '../HandlerBuilder'
import { PeaForm } from '../PeaForm'

export interface FieldProps {
  name: string
  children?: ReactElement
}

export function createField<T>(handler: HandlerBuilder<T>, state: State<T>) {

  if (PeaForm.fieldCreator) {
    return PeaForm.fieldCreator(handler, state)
  }
  const Field: React.FC<FieldProps> = props => {
    const { name, children } = props

    const { values } = state
    const field: any = {
      name,
      onChange: handler.createChangeHandler(name),
      onBlur: handler.createBlurHandler(),
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
