---
id: active-link
title: Active Link
sidebar_label: Active Link
---


使用 `activeClassName` 实现 Active Link: 

```jsx
import React from 'react'
import { Link } from '@peajs/router'

import './Nav.css'

export default () => (
  <div>
    <Link activeClassName="selected" to="/settings/profile">
      Profile
    </Link>
    <span> | </span>
    <Link activeClassName="selected" to="/settings/account">
      Account
    </Link>
  </div>
)
```

样式：

```css
/* Nav.css */
.selected {
  color: red
}
```