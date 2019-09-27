# Pea request

> An elegant HTTP client based on [Fetch](https://fetch.spec.whatwg.org/)

## Installation

```sh
npm i @peajs/request
```

## Usage

```js
import { request } from '@peajs/request'

;(async () => {
  const data = await request('https://jsonplaceholder.typicode.com/todos/1')
})()
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
