# 受控表单

如果你的表单比较复杂，需要比较细致的控制，你可能需要受控表单。

## 用法

核心 Api 是 `createForm`，然后使用 `handleSubmit` 、`handleChange`、`handleBlur` 来控制表单。

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
  const {
    values,
    submitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = basicForm.useForm()

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button type="submit" disabled={submitting}>
        submit
      </button>
    </form>
  )
}
```
