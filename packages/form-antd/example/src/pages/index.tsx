import 'reflect-metadata'
import React from 'react'
import { useForm } from '@peajs/form-antd'


class User {
  username = ''
  password = ''
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input placeholder="username" {...name('username')} />
      <input placeholder="password" {...name('password')} />
      <button type="submit">Submit</button>
    </form>
  )
}
