# @peajs/router

## Installation

```sh
npm i @peajs/router
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Link } from '@peajs/router'

const Home = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <h1>Home</h1>
  </div>
)

const About = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <h1>About</h1>
  </div>
)

const NotFound = () => <div>404 not found</div>

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '**',
    component: NotFound,
  },
]

const App = () => <Router routes={routes} />

ReactDOM.render(<App />, document.getElementById('root'))
```

## Interceptor

```ts
import { navigate, intercept } from '@peajs/router'

intercept((ctx, next) => {
  if (ctx.to === '/') {
    navigate('/dashboard')
  } else {
    return next()
  }
})
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
