---
id: less
title: 使用 Less
sidebar_label: 使用 Less
---

要在 `peajs` 中使用less，需要使用插件 `pea-plugin-less`:

**`pea.config.ts`**

```js
import { PeaConfig } from '@peajs/types'
import LessPlugin from 'pea-plugin-less'

const config: PeaConfig = {
  plugins: [
    new LessPlugin()
  ],
}

export default config

```

**`button.less`**

```css
.error {
  background-color: red;
}
```

**`Button.tsx`**

```jsx
import React from 'react'

import './button.less'

const Button = () => <button>Error Button</button>
```
