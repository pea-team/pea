import React, { FC, useContext, ReactElement } from 'react'
import get from 'lodash.get'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import { Result } from '@peajs/form'
import { FormContext } from './Form'

// const types = ['text', 'password', 'number', 'radio', 'checkbox']
const FormItem = Form.Item

interface ItemProps extends FormItemProps {
  name: string
  type?: string
  children?: ReactElement
}

export function help(name: string, { state }: Result) {
  const itemProps = {} as FormItemProps
  const error = state.errors[name]

  if (error && state.touched[name]) {
    itemProps.validateStatus = 'error'
    itemProps.help = error
  }

  if (!error && state.touched[name]) {
    itemProps.validateStatus = 'success'
    itemProps.hasFeedback = true
  }
  return itemProps
}

export const Item: FC<ItemProps> = props => {
  const { name, children, label = '', ...rest } = props
  const result = useContext(FormContext)
  const { handlers, handlerBuilder, state } = result

  const fieldProps = {
    onChange: handlerBuilder.createChangeHandler(name),
    onBlur: handlers.handleBlur,
  } as any

  const itemProps = {
    ...rest,
    label,
  } as ItemProps

  fieldProps.value = get(state.values, name)

  const visible = get(state.visible, name)
  if (visible === false) return null
  return (
    <FormItem {...itemProps} {...help(name, result)}>
      {React.cloneElement(children as any, fieldProps)}
    </FormItem>
  )
}
