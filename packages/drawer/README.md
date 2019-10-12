
# @peajs/drawer

## Installation

```bash
npm i @peajs/drawer
```

## Quick Start

```js
import React from 'react'
import { Drawers, DrawerConfig, drawerStore } from '@peajs/drawer'

const About = () => (
  <span>
    about
    <button onClick={() => drawerStore.close('about')}>close</button>
  </span>
)

const config: DrawerConfig = [
  {
    name: 'about',
    component: About,
  },
]

export default () => (
  <div>
    <Drawers config={config} />
    <span>Hi, Dahlia</span>
    <button onClick={() => drawerStore.open('about')}>open</button>
  </div>
)
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
