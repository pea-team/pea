---
id: styled-jsx
title: 使用 styled-jsx
sidebar_label: 使用 styled-jsx
---

`styled-jsx` 是一个非常优秀的 React CSS 解决方案，`Pea` 默认支持 `styled-jsx`，你可以直接使用：

```jsx
import React from 'react';

export const App = () => (
  <div>
    Hi, Pea
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: cadetblue;
      }
      div {
        background: bisque;
      }
      @media (max-width: 600px) {
        div {
          background: tan;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: ghostwhite;
      }
    `}</style>
  </div>
)
```

详细文档: [styled-jsx](https://github.com/zeit/styled-jsx)

对于 VSCode 用户，为了能有良好的开发体验，推荐按相关 VSCode 插件：

- [vscode-styled-jsx](https://marketplace.visualstudio.com/items?itemName=blanu.vscode-styled-jsx) - 用于语法高亮
- [vscode-styled-jsx-languageserver](https://marketplace.visualstudio.com/items?itemName=AndrewRazumovsky.vscode-styled-jsx-languageserver) - 用于智能提示、补全、校验等