---
id: basic
title: 约定式弹窗
sidebar_label: 约定式弹窗
---

Pea 使用类似约定式路由的约定式弹窗：

```bash
.
├── package.json
├── modals
│   ├── ModalUser.tsx 
│   └── ModalLogin.tsx
└── tsconfig.json
```

弹窗可以是任何 React 组件：

```js
import React from 'react'

const ModalLogin = () => (
  <div>
    <h1>Modal Login Content</h1>
  </div>
)

export default ModalLogin
```
