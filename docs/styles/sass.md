---
id: sass
title: 使用 Sass
sidebar_label: 使用 Sass
---

在 `peajs` 使用 Sass 非常简单，`peajs`已经内置了`sass-loader`，你只需安装 `node-sass`:

```bash
npm i node-sass -D
```

使用方式类似导入 CSS 文件一样导入即可:

**`button.scss`**

```css
.error {
  background-color: red;
}
```

**`Button.tsx`**

```jsx
import React from 'react'

import './button.scss'

const Button = () => <button className="error">Error Button</button>
```
