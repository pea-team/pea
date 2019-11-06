import 'reflect-metadata'
import React from 'react'
// import { useForm } from '@peajs/form'
import { useForm } from '../src'

class User {
  username = 'Jack'
  password = ''
}

export default () => {
  const { handlers, name, actions, state } = useForm(User, {
    initValues(values) {
      console.log('init.........')
      return {
        ...values,
        username: 'new name',
        password: '1111',
      }
    },
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <input placeholder="username" {...name('username')} />
      <input placeholder="password" {...name('password')} />
      <button type="submit">Submit</button>
      <button type="button" onClick={actions.resetForm}>
        Reset
      </button>
    </form>
  )
}
