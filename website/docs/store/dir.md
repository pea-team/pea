---
id: dir
title: 目录结构
sidebar_label: 目录结构
---

默认情况下，`@peajs/store` 是分形的，`@peajs/store`并不限制 store 的组织方式，你可以把 store 定义在任意位置，但为了提高项目的可维护性，推荐下面的目录结构组织方式：

```bash
.
├── components
├── pages
└── stores # your store files
    ├── userStore.ts
    └── todoStore.ts
```
