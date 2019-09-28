# 表单校验

Pea 的表单校验非常简单，并且具有非常强的扩展性。

## 用法

```js
import React from 'react'
import { createForm, required, min } from '@peajs/form'

const basicForm = createForm({
  initialValues: {
    email: 'foo@bar.com',
    password: '',
  },
  validator: {
    email: [required('require email'), min(6, 'email too short')],
    password: [required('need password'), min(6, 'password too short')],
  },
  onSubmit: async (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2))
    setSubmitting(false)
  },
})

export const Home = () => {
  const { submitting } = basicForm.useForm()

  return (
    <form ref={basicForm.useRef()}>
      <input name="email" type="text" />
      <input name="password" type="text" />
      <button type="submit" disabled={submitting}>
        submit
      </button>
    </form>
  )
}
```

## 自定义校验器

实现一个 url 校验器:

```js
import isUrl from 'util-is-url'

// an url validtor
const url = (message?: string) => (value: any) => {
  if (isUrl(value)) return { ok: true }
  return { ok: false, message: message || '' }
}
```

使用：

```js
const basicForm = createForm({
  validator: {
    url: [url('should be a valid url ')],
  },
})
```
