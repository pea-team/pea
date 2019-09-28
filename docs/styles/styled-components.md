---
id: styled-components
title: 使用 styled-components
sidebar_label: 使用 styled-components
---

[styled-components](https://github.com/styled-components/styled-components) 是最优秀的 CSS in JS 解决方案之一，在 `Pea` 中使用非常简单。

首先，安装 `styled-components`

```bash
yarn add styled-components
```

快速使用：

```jsx
import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

export const App = () => (
  <Wrapper>
    <Title>Hello World!</Title>
  </Wrapper>
)
```

为了更好的调试体验，`Pea` 默认集成了 [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components)，集体用法看：[babel-plugin](https://www.styled-components.com/docs/tooling#babel-plugin)。

详细文档: [https://github.com/styled-components/styled-components](styled-components)

对于 VSCode 用户，为了能有良好的开发体验，推荐按相关 VSCode 插件：

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) - 用于语法高亮
