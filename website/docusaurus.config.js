/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: "PeaJS",
  tagline: "A React Framework based on TypeScript.",
  baseUrl: "/",
  url: "https://pea.js.org/",
  favicon: "img/favicon.png",
  projectName: "pea-team.github.io",
  organizationName: "pea-team",
  themeConfig: {
    image: "img/logo.png",
    // gtag: {
    //   trackingID: "UA-141789564-1"
    // },
    // googleAnalytics: {
    //   trackingID: 'UA-141789564-1',
    // },
    // algolia: {
    //   apiKey: "47ecd3b21be71c5822571b9f59e52544",
    //   indexName: "docusaurus-2",
    //   algoliaOptions: {}
    // },
    navbar: {
      title: "PeaJS",
      logo: {
        alt: "Logo",
        src: "/img/logo.png"
      },
      links: [
        { to: "docs/intro/quick-start", label: "Docs", position: "left" },
        {
          href: "https://www.github.com/pea-team/pea",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Quick Start",
              to: "/docs/intro/quick-start"
            },
            {
              label: "About",
              to: "/docs/intro/about"
            },
            {
              label: "Plugin",
              to: "/docs/plugin/use"
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/pea"
            },
            {
              label: "Feedback",
              to: "https://github.com/pea-team/pea/issues"
            }
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/pea-team/pea"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} forsigner.`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/pea-team/pea/edit/master/website/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
