/*
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: {
    简介: ["intro/quick-start", "intro/about"],
    配置: ["config/business", "config/build"],
    插件: ["plugin/use", "plugin/list", "plugin/development"],
    样式: [
      "styles/css",
      "styles/css-modules",
      "styles/sass",
      "styles/less",
      "styles/styled-components",
      "styles/styled-jsx"
    ],
    路由: [
      "router/plugin",
      "router/convention",
      "router/config",
      "router/link",
      "router/navigate",
      "router/url-params",
      "router/nested",
      "router/active-link",
      "router/intercept"
    ],
    "网络请求(Rest)": [
      "rest/started",
      "rest/useFetch",
      "rest/useUpdate",
      "rest/fetch",
      "rest/reFetch"
    ],
    "网络请求(GraphQL)": [
      "graphql/started",
      "graphql/useQuery",
      "graphql/useMutate",
      "graphql/query"
    ],
    状态管理: ["store/started"],
    表单: [
      "form/start",
      "form/array",
      "form/nested-object",
      "form/validation",
      "form/async-validation",
      "form/error-message",
      "form/antd"
    ]
  }
};
