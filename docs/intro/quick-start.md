---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

## 快速开始

```bash
npx pea-cli new myapp
cd myapp
npm start
```

它将在当前文件夹中创建一个名为 myapp 的目录，目录结构如下：

```bash
.
├── package.json
├── src
│   └── pages
│       └── index.tsx
└── tsconfig.json
```

启动成功后，然后访问浏览器：http://localhost:3000

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 生产环境打包
- `npm run test` - 启动单元测试
