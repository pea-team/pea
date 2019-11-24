---
id: convention
title: 约定式路由
sidebar_label: 约定式路由
---

对于简单的项目，非常推荐使用 **约定式路由**，它更加简洁，易于上手，让你更容易专注于业务的开发。

假设在你已经配置好路由插件，新建一个项目，目录结构如下：

```bash
.
├── package.json
├── pea.config.ts
├── src
│   └── pages
│       ├── index.tsx # localhost:3000
│       └── about.tsx # localhost:3000/about
└── tsconfig.json
```

请确保你已经安装下面相关包:

```bash
npm i pea-plugin-router @peajs/router
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
    "noEmit": true
  },
  "include": ["src"]
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

线上 Demo: https://build-2okbldsfc.now.sh

文件夹 `src/pages` 的 `.tsx` 文件会映射为路由的 path。

举个例子，`src/pages/about.tsx` 文件会直接到 url 的 path: `/about`。
