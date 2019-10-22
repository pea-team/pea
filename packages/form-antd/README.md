# @peajs/form-antd

> Use Ant Design with @peajs/form

## Installation

```sh
npm i @peajs/form-antd
```

## Quickstart

```js
import React from 'react'
import { Input } from 'antd'
import { useForm, Form, Item } from '@peajs/form-antd'

class User {
  username = 'foo'
  password = ''
}

export default () => {
  const result = useForm(User, {
    onSubmit(values) {
      console.log('values:', values)
    },
  })

  return (
    <Form use={result}>
      <Item name="username">
        <Input />
      </Item>
      <Item name="password">
        <Input />
      </Item>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
