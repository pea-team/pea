# Pea i18n

## Installation

```sh
npm i @peajs/i18n
```

## Quick Start

### locale file

```bash

locales
├── cn.json
├── default.json
└── en.json
```

```json
// en.json
{
  "name": "pea"
}

```

```js


import { i18n } from '@peajs/i18n'

export default () => (
  <div>{i18n.name}</div>
)

// ...
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
