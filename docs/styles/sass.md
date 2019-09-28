---
id: sass
title: 使用 Sass
sidebar_label: 使用 Sass
---

`Pea` 默认支持 Sass，你不需要额外配置什么，类似导入 CSS 文件一样导入即可。

**`button.scss`**

```css
.error {
  background-color: red;
}
```

**`Button.js`**

```jsx
import React from 'react'

import './button.scss'

const Button = () => <button>Error Button</button>
```
