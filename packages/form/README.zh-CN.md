# @peajs/form

> 一个极简主义设计的 React Form

[English](./README.md) | 简体中文

## 安装

```sh
npm i @peajs/form
```

## 快速开始

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
