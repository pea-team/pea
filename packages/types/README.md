# @pea/types

## Installation

```sh
npm i @peajs/types
```

## Api

### `IPlugin`

```js
import { IPlugin } from '@peajs/types'
import { Configuration } from 'webpack'

export default class MyPlugin implements IPlugin {
  updateWebpackConfig(config: Configuration) {
    // Do something
    const newConfig = handle(config)
    return newConfig
  }
}
```

### `PeaConfig`

```js
import { PeaConfig } from '@peajs/types'
import LessPlugin from 'pea-plugin-less'

const config: PeaConfig = {
  plugins: [new LessPlugin()],
}

export default config
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
