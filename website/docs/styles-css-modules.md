---
id: testcss
title: Ft
sidebar_label: Ft
---

# 使用 CSS Modules

`Dahlia` 默认支持 CSS Modules，CSS Modules 允许你在不同的文件中使用相同的 CSS 类名，实现 Scoped CSS，而无需担心命名冲突。

**`button.module.css`**

```css
.error {
  background-color: red;
}
```

**`Button.js`**

```js
import React from 'react'
import styles from './button.module.css'

const Button = () => <button className={styles.error}>Error Button</button>
```

详细文档：[css-modules](https://github.com/css-modules/css-modules)
