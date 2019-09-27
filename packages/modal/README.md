# @peajs/modal

## Installation

```bash
npm i @peajs/modal
```

## Quick Start

```js
import React from 'react'
import { Modals, ModalConfig, modalStore } from '@peajs/modal'

const About = () => (
  <span>
    about
    <button onClick={() => modalStore.close('about')}>close</button>
  </span>
)

const config: ModalConfig = [
  {
    name: 'about',
    component: About,
  },
]

export default () => (
  <div>
    <Modals config={config} />
    <span>Hi, Dahlia</span>
    <button onClick={() => modalStore.open('about')}>open</button>
  </div>
)
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
