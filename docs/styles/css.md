---
id: css
title: 使用原生 CSS
sidebar_label: 使用原生 CSS
---

# 

你可以直接在组件中导入(import) CSS 文件：

**`button.css`**

```css
.button {
  padding: 20px;
}
```

**`Button.js`**

```jsx
import React from 'react'
import './button.css'

const Button = () => <button className="button">Click</button>
```

在开发环境中，为了能够让 CSS hot reload，CSS 会直接打到 JS 中。

在生产环境中，所有 CSS 文件提取到一个 `.css` 文件中，提升网络加载速度。
