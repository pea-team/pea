import React, { FC, createContext } from 'react'
import { Form as AntdForm } from 'antd'
import { FormProps as AntdFormProps } from 'antd/lib/form'
import { Result } from '@peajs/form'

export const FormContext = createContext({} as Result)
interface FormProps extends AntdFormProps {
  use: Result
}

export const Form: FC<FormProps> = ({ children, use, ...rest }) => {
  return (
    <FormContext.Provider value={use}>
      <AntdForm onSubmit={use.handlers.handleSubmit} {...rest}>
        {children}
      </AntdForm>
    </FormContext.Provider>
  )
}
