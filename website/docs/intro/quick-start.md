---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

## 初始化项目

使用 `pea-cli` 来初始化 pea 项目:

```bash
npm i -g pea-cli
pea new myapp # 选择 simple
cd myapp
npm run dev
```

它将在当前文件夹中创建一个名为 myapp 的目录，目录结构如下：

```bash
.
├── package.json
├── src
│   └── App.tsx
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:3000

这是一个最小化的 pea 应用，核心文件只有一个 `App.tsx`:

<!--DOCUSAURUS_CODE_TABS-->

<!--src/App.tsx-->

```js
import React, { Fragment } from 'react'

export default class App extends React.Component {
  render() {
    return <Fragment>Hi pea</Fragment>
  }
}
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
    "pea-cli": "^0.1.0",
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

这是一个最小化的 pea 应用，核心文件只有一个 `App.tsx`，修改文件 `App.tsx`, 页面会自动刷新。

线上 Demo：https://build-e9c7iqnm3.now.sh

## 使用路由

peajs 是一个插件化的框架，使用 peajs 官方提供的路由插件 `pea-plugin-router`，你可以快速的使用路由功能。

新建一个项目，目录结构如下：

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

为了使用路由插件，你需要安装相关包:

```bash
npm i pea-plugin-router @peajs/router
```

<!--DOCUSAURUS_CODE_TABS-->

<!--pea.config.ts-->

```js
import RouterPlugin from 'pea-plugin-router'

const config = {
  title: 'pea',
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

`pea.config.ts` 是项目的配置文件，我们在配置文件使用插件 `pea-plugin-router`，即可启用 peajs 的路由功能，路由插件默认使用约定式路由，文件夹 `src/pages` 的文件会映射为路由的 path。

配置文件 `pea.config.ts` 和插件的使用后面会详细介绍，路由插件还提供配置式的路由，配置式路由更加强大灵活。
