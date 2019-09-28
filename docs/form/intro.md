# 简介

表单是许多 Web 应用程序的核心功能，Pea 内置了表单功能，你不需要再引入如 Redux-form、Formik 等第三方表单类库，Pea Form 基于 React Hooks 实现，简单易用，并且功能强大。

Pea 表单分为**受控表单(controlled form)**和**非受控表单(uncontrolled form)**。

> 什么是 controlled 和 uncontrolled？请看官方的介绍：[Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)、[Forms](https://reactjs.org/docs/forms.html)

## 让表单元素 “受控”

让表单元素变为“受控”，给它设置特定的属性即可以，下面每种表单元素触发 “受控” 各自所需的属性。

| Element                   | 触发受控的 property  |
| ------------------------- | -------------------- |
| `<input type="text" />`     | value="string"       |
| `<input type="checkbox" />` | checked={boolean}    |
| `<input type="radio" />`    | checked={boolean}    |
| `<textarea />`              | value="string"       |
| `<select />`                | value="option value" |




## 如何选择


TODO: 