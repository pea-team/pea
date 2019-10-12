---
id: nested
title: 嵌套路由
sidebar_label: 嵌套路由
---

嵌套路由必须使用配置式路由，路由配置：

```jsx
import { Routes } from '@peajs/router'
import Index from '@pages/index'
import Settings from '@pages/settings'
import Profile from '@pages/profile'
import Account from '@pages/account'

const routes: Routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/settings',
    component: Settings,
    children: [
      {
        path: '/profile',
        component: Profile,
      },
      {
        path: '/account',
        component: Account,
      },
    ],
  },
]

export default routes
```

注意，路由父组件需要渲染 `children`：

```jsx
import React, { FunctionComponent } from 'react'
import Nav from '@components/Nav'

const Settings: FunctionComponent = ({ children }) => (
  <div>
    <h1>Settings</h1>
    <Nav />
    {children}
  </div>
)

export default Settings
```
