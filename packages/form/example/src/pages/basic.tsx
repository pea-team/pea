import React from 'react'
// import { useForm } from '@peajs/form'
import { useForm } from '../src'

import './index.css'

class User {
  username = ''
  password = ''
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      console.log('values:', values)
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('username')} />
      <button type="submit">Submit</button>
    </form>
  )
}
