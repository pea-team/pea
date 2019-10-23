import 'reflect-metadata'
import React from 'react'
import { Input } from 'antd'
import { IsNotEmpty } from 'class-validator'
// import { useForm, Form, Field } from '../src'
import { useForm, Form, Field } from '@peajs/form-antd'

class User {
  @IsNotEmpty()
  username = ''

  @IsNotEmpty()
  password = ''
}

export default () => {
  const result = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Form use={result}>
      <pre>{JSON.stringify(result.state, null, 2)}</pre>
      <Field name="username">
        <Input />
      </Field>
      <Field name="password">
        <Input />
      </Field>
      <button type="submit">Submit</button>
    </Form>
  )
}
