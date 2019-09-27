# @peajs/rest

## Installation

```sh
npm i @peajs/rest
```

## Usage

```jsx
import React from 'react'
import { useFetch } from '@peajs/rest'

const Todos = () => {
  const { loading, data, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos',
  )

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
export defulat Todos
```

demo：

[![Edit fetch-data-with-dahlia](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lxz0ym7qj9?fontsize=14)

## License

[MIT License](https://github.com/forsigner/gery/blob/master/LICENSE)