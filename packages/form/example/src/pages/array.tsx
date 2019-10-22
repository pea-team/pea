import 'reflect-metadata'
import React from 'react'
import { useForm } from '@peajs/form'

class User {
  friends: string[] = ['Rose', 'curry']
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('friends[0]')} />
      <input {...name('friends[1]')} />
      <button type="submit">Submit</button>
    </form>
  )
}
