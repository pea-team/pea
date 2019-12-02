
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world'),
  exact: true,
  
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola'),
  exact: true,
  
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags'),
  exact: true,
  
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus'),
  exact: true,
  
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook'),
  exact: true,
  
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello'),
  exact: true,
  
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola'),
  exact: true,
  
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/api/README',
  component: ComponentCreator('/docs/api/README'),
  exact: true,
  
},
{
  path: '/docs/api/bootstrap',
  component: ComponentCreator('/docs/api/bootstrap'),
  exact: true,
  
},
{
  path: '/docs/api/createstore',
  component: ComponentCreator('/docs/api/createstore'),
  exact: true,
  
},
{
  path: '/docs/api/store.dispatch',
  component: ComponentCreator('/docs/api/store.dispatch'),
  exact: true,
  
},
{
  path: '/docs/api/store.fetch',
  component: ComponentCreator('/docs/api/store.fetch'),
  exact: true,
  
},
{
  path: '/docs/api/store.query',
  component: ComponentCreator('/docs/api/store.query'),
  exact: true,
  
},
{
  path: '/docs/api/store.usestore',
  component: ComponentCreator('/docs/api/store.usestore'),
  exact: true,
  
},
{
  path: '/docs/api/usefetch',
  component: ComponentCreator('/docs/api/usefetch'),
  exact: true,
  
},
{
  path: '/docs/api/usemutate',
  component: ComponentCreator('/docs/api/usemutate'),
  exact: true,
  
},
{
  path: '/docs/api/usequery',
  component: ComponentCreator('/docs/api/usequery'),
  exact: true,
  
},
{
  path: '/docs/api/useupdate',
  component: ComponentCreator('/docs/api/useupdate'),
  exact: true,
  
},
{
  path: '/docs/config/build',
  component: ComponentCreator('/docs/config/build'),
  exact: true,
  
},
{
  path: '/docs/config/business',
  component: ComponentCreator('/docs/config/business'),
  exact: true,
  
},
{
  path: '/docs/css',
  component: ComponentCreator('/docs/css'),
  exact: true,
  
},
{
  path: '/docs/faq',
  component: ComponentCreator('/docs/faq'),
  exact: true,
  
},
{
  path: '/docs/form/intro',
  component: ComponentCreator('/docs/form/intro'),
  exact: true,
  
},
{
  path: '/docs/graphql/intro',
  component: ComponentCreator('/docs/graphql/intro'),
  exact: true,
  
},
{
  path: '/docs/intro/about',
  component: ComponentCreator('/docs/intro/about'),
  exact: true,
  
},
{
  path: '/docs/intro/quick-start',
  component: ComponentCreator('/docs/intro/quick-start'),
  exact: true,
  
},
{
  path: '/docs/modal/antd',
  component: ComponentCreator('/docs/modal/antd'),
  exact: true,
  
},
{
  path: '/docs/modal/basic',
  component: ComponentCreator('/docs/modal/basic'),
  exact: true,
  
},
{
  path: '/docs/plugin/development',
  component: ComponentCreator('/docs/plugin/development'),
  exact: true,
  
},
{
  path: '/docs/plugin/list',
  component: ComponentCreator('/docs/plugin/list'),
  exact: true,
  
},
{
  path: '/docs/plugin/use',
  component: ComponentCreator('/docs/plugin/use'),
  exact: true,
  
},
{
  path: '/docs/rest/intro',
  component: ComponentCreator('/docs/rest/intro'),
  exact: true,
  
},
{
  path: '/docs/router/active-link',
  component: ComponentCreator('/docs/router/active-link'),
  exact: true,
  
},
{
  path: '/docs/router/config',
  component: ComponentCreator('/docs/router/config'),
  exact: true,
  
},
{
  path: '/docs/router/convention',
  component: ComponentCreator('/docs/router/convention'),
  exact: true,
  
},
{
  path: '/docs/router/intercept',
  component: ComponentCreator('/docs/router/intercept'),
  exact: true,
  
},
{
  path: '/docs/router/intro',
  component: ComponentCreator('/docs/router/intro'),
  exact: true,
  
},
{
  path: '/docs/router/link',
  component: ComponentCreator('/docs/router/link'),
  exact: true,
  
},
{
  path: '/docs/router/navigate',
  component: ComponentCreator('/docs/router/navigate'),
  exact: true,
  
},
{
  path: '/docs/router/nested',
  component: ComponentCreator('/docs/router/nested'),
  exact: true,
  
},
{
  path: '/docs/router/plugin',
  component: ComponentCreator('/docs/router/plugin'),
  exact: true,
  
},
{
  path: '/docs/router/url-params',
  component: ComponentCreator('/docs/router/url-params'),
  exact: true,
  
},
{
  path: '/docs/store/intro',
  component: ComponentCreator('/docs/store/intro'),
  exact: true,
  
},
{
  path: '/docs/styles/css',
  component: ComponentCreator('/docs/styles/css'),
  exact: true,
  
},
{
  path: '/docs/styles/css-modules',
  component: ComponentCreator('/docs/styles/css-modules'),
  exact: true,
  
},
{
  path: '/docs/styles/documentation-intro',
  component: ComponentCreator('/docs/styles/documentation-intro'),
  exact: true,
  
},
{
  path: '/docs/styles/less',
  component: ComponentCreator('/docs/styles/less'),
  exact: true,
  
},
{
  path: '/docs/styles/sass',
  component: ComponentCreator('/docs/styles/sass'),
  exact: true,
  
},
{
  path: '/docs/styles/styled-components',
  component: ComponentCreator('/docs/styles/styled-components'),
  exact: true,
  
},
{
  path: '/docs/styles/styled-jsx',
  component: ComponentCreator('/docs/styles/styled-jsx'),
  exact: true,
  
},
{
  path: '/docs/test',
  component: ComponentCreator('/docs/test'),
  exact: true,
  
},
{
  path: '/docs/testcss',
  component: ComponentCreator('/docs/testcss'),
  exact: true,
  
},
{
  path: '/docs/webpack/basic',
  component: ComponentCreator('/docs/webpack/basic'),
  exact: true,
  
},
{
  path: '/docs/webpack/plugin',
  component: ComponentCreator('/docs/webpack/plugin'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
