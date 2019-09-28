---
id: navigate
title: 使用 `navigate`
sidebar_label: 使用 `navigate`
---

有些场景，使用组件`<Link>` 跳转并不好处理，比如你提交一个表单，成功好跳转到某个页面，这时你可以使用编程的方式 `navigate` 实现页面跳转:

```js
import { navigate } from '@peajs/router'

const LoginForm = () => (
  <form
    onSubmit={event => {
      event.preventDefault()
      const username = event.target.elements[0].value

      // 跳转到用户页
      navigate(`/users/${username}`)
    }}
  >
    <label>
      username: <input type="text" />
    </label>
    <button type="submit">Login</button>
  </form>
)
```
