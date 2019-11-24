---
id: intro
title: 约定式路由
sidebar_label: 约定式路由
---

默认情况下，Pea 使用类似 Next.js 的约定式路由，`pages` 里面的 `.tsx` 文件会直接映射到路由的 path。

```bash
.
├── package.json
├── src
│   └── pages
│       ├── index.tsx # localhost:3000
│       ├── users.tsx # localhost:3000/users
│       └── about.tsx # localhost:3000/about
└── tsconfig.json
```

举个例子，下面文件会直接到 url 的 path: `/about`。

```js
import React from 'react'

const About = () => (
  <div>
    <h1>Page About</h1>
    <p>About me</p>
  </div>
)

export default About
```
