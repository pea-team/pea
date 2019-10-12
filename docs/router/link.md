---
id: link
title: 使用 `<Link>`
sidebar_label: 使用 `<Link>`
---

假设你有两个页面：Home 和 About，使用 `<Link>` 组件进行页面跳转：

```js
// src/pages/index.js
import { Link } from '@peajs/router'

function Home() {
  return (
    <div>
      <Link to="/about">About</Link>
      <p>Page Home!</p>
    </div>
  )
}

export default Home
```

```js
// src/pages/about.js
function About() {
  return <p>Page About!</p>
}

export default About
```
