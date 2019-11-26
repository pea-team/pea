import React, { FC, createContext } from 'react'
import { Form as AntdForm } from 'antd'
import { FormProps as AntdFormProps } from 'antd/lib/form'
import { Result } from 'stook-form'

interface FormProps extends AntdFormProps {
  use: Result
}
export const FormContext = createContext({} as Result)

export const Form: FC<FormProps> = ({ children, use, ...rest }) => {
  const { Provider } = FormContext
  return (
    <Provider value={use}>
      <AntdForm onSubmit={use.handlers.handleSubmit} {...rest}>
        {children}
      </AntdForm>
    </Provider>
  )
}
