import React, { ReactElement } from 'react'
import get from 'lodash.get'
import { State } from '../types'
import { createChangeHandler } from './createChangeHandler'
import { createBlurHandler } from './createBlurHandler'

export interface FieldProps {
  name: string
  children?: ReactElement
}

export function createField<T>(state: State<T>, setState: any) {
  const Field: React.FC<FieldProps> = props => {
    const { name, children } = props

    const { values } = state
    // TODO:: handle any
    const field: any = {
      name,
      onChange: createChangeHandler(state, setState, name),
      onBlur: createBlurHandler(state, setState),
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
