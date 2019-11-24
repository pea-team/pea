export default {
  "plugins": [],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "image": "img/logo.png",
    "navbar": {
      "title": "PeaJS",
      "logo": {
        "alt": "Logo",
        "src": "/img/logo.png"
      },
      "links": [
        {
          "to": "docs/intro/quick-start",
          "label": "Docs",
          "position": "left"
        },
        {
          "href": "https://www.github.com/pea-team/pea",
          "label": "GitHub",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Quick Start",
              "to": "/docs/intro/quick-start"
            },
            {
              "label": "About",
              "to": "/docs/intro/about"
            },
            {
              "label": "Plugin",
              "to": "/docs/plugin/use"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Stack Overflow",
              "href": "https://stackoverflow.com/questions/tagged/pea"
            },
            {
              "label": "Feedback",
              "to": "https://github.com/pea-team/pea/issues"
            }
          ]
        },
        {
          "title": "Social",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/pea-team/pea"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2019 forsigner."
    }
  },
  "title": "PeaJS",
  "tagline": "A React Framework based on TypeScript.",
  "baseUrl": "/",
  "url": "https://pea.js.org/",
  "favicon": "img/favicon.png",
  "projectName": "pea-team.github.io",
  "organizationName": "pea-team",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/forsigner/repos/pea-team/pea/website/sidebars.js",
          "editUrl": "https://github.com/pea-team/pea/edit/master/website/",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true
        },
        "theme": {
          "customCss": "/Users/forsigner/repos/pea-team/pea/website/src/css/custom.css"
        }
      }
    ]
  ]
};