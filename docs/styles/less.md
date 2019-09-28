---
id: less
title: 使用 Less
sidebar_label: 使用 Less
---

`Pea` 默认支持 Less，

**`button.less`**

```css
.error {
  background-color: red;
}
```

**`Button.js`**

```jsx
import React from 'react'

import './button.less'

const Button = () => <button>Error Button</button>
```
