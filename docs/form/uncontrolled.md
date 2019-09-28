# 非受控表单

如果你的表单比较简单，比如你需要一个用户登录表单，推荐你使用非受控表单。

## 用法

核心 Api 是 `createForm`，然后使用 ref 关联你表单。

```js
import React from 'react'
import { createForm } from '@peajs/form'

const basicForm = createForm({
  initialValues: {
    email: 'foo@bar.com',
    password: '123456',
  },
  onSubmit: async (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2))
    setSubmitting(false)
  },
})

export default () => {
  const { submitting } = basicForm.useForm()

  return (
    <form ref={basicForm.useRef()}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit" disabled={submitting}>
        submit
      </button>
    </form>
  )
}
```
