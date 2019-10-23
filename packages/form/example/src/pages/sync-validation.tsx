import React from 'react'
import { useForm } from '@peajs/form'
import { IsNotEmpty } from 'class-validator'

class User {
  @IsNotEmpty({ message: 'require username' })
  username = 'foo'

  @IsNotEmpty()
  password = ''
}

export default () => {
  const { handlers, name, error } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('username')} />
      <div className="field-error">{error('username')}</div>
      <input {...name('password')} />
      <div className="field-error">{error('password')}</div>
      <button type="submit">Submit</button>
    </form>
  )
}
