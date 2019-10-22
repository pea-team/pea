import React, { FC, useContext } from 'react'
import get from 'lodash.get'
import { FormContext } from './Form'

interface FieldProps {
  name: string
}

export const Field: FC<FieldProps> = ({ name, children }) => {
  const result = useContext(FormContext)
  const { handlers, handlerBuilder, state } = result

  const props = {
    name,
    onChange: handlerBuilder.createChangeHandler(name),
    onBlur: handlers.handleBlur,
  } as any

  props.value = get(state.values, name)

  const visible = get(state.visible, name)
  if (visible === false) return null

  return React.cloneElement(children as any, props)
}
