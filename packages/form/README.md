# @peajs/form

> React Form base on hooks

English | [简体中文](./README.zh-CN.md)

## Installation

```sh
npm i @peajs/form
```

## Quickstart

```js
import React from 'react'
import { useForm } from '@peajs/form'

class User {
  username = 'foo'
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
      <input {...name('password')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
