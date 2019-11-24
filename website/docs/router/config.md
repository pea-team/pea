---
id: config
title: 配置式路由
sidebar_label: 配置式路由
---

对与复杂的应用，你可以使用配置式路由，配置式路由更加灵活强大，启用配置式路由非常简单，在约定式路由的基础上，增加配置文件 `src/config/router.config.ts`:

```js
import { Routes } from '@peajs/router'
import Index from '@pages/index'
import About from '@pages/about'

const routes: Routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/about',
    component: About,
  },
]

export default routes
```

项目目录结构：

```bash
.
├── package.json
├── pea.config.ts
├── src
│   ├── config
│   │   └── router.config.ts # 路由配置文件
│   └── pages
│       ├── about.tsx
│       └── index.tsx
└── tsconfig.json
```

项目代码如下:

<!--DOCUSAURUS_CODE_TABS-->

<!--pea.config.ts-->

```js
import RouterPlugin from 'pea-plugin-router'

const config = {
  plugins: [new RouterPlugin()],
}
export default config
```

<!--src/config/router.config.ts-->

```js
import { Routes } from '@peajs/router'
import Index from '@pages/index'
import About from '@pages/about'

const routes: Routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/about',
    component: About,
  },
]

export default routes
```

<!--src/pages/index.ts-->

```js
import React from 'react'
import { Link } from '@peajs/router'

export default () => (
  <div>
    <h1>Home Page</h1>
    <nav>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/about">About</Link>
    </nav>
  </div>
)
```

<!--src/pages/about.ts-->

```js
import React from 'react'
import { Link } from '@peajs/router'

export default () => (
  <div>
    <h1>About Page</h1>
    <nav>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/about">About</Link>
    </nav>
  </div>
)
```

<!--package.json-->

```json
{
  "name": "myapp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "pea dev",
    "build": "pea build",
    "test": "pea test"
  },
  "dependencies": {
    "@peajs/core": "0.1.0",
    "@peajs/router": "0.1.0",
    "@types/react": "^16.9.5",
    "@types/react-dom": "^16.9.1",
    "pea-cli": "^0.1.0",
    "pea-plugin-router": "^0.1.0",
    "react": "^16.10.2",
    "react-dom": "^16.10.2"
  }
}
```

<!--tsconfig.json-->

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": ".",
    "module": "esnext",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "preserve",
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "@pages/*": ["pages/*"]
    }
  },
  "include": ["src"]
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

线上 Demo: https://build-2okbldsfc.now.sh

新的路由映射方式将由配置文件决定。
