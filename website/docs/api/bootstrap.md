# bootstrap

用来初始化 Pea.js，推荐在入口文件初始化，这里为什么不使用 Provider 的方式来初始化，因为初始化的配置跟子组件并没有关系，所以没必要，使用 "**Programmatically**" 的方式初始化会更清晰。

```javascript
// index.ts
import Pea from '@peajs/core'
import { routes } from './routes'

Pea.bootstrap({
  routes,
  selector: '#root',
})
```

```javascript
// src/router.config.ts
import { Routes } from '@peajs/router'
import { Home } from '@pages/Home'

export const routes: Routes = [
  {
    path: '/',
    component: Home,
  },
]
```

