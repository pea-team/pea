import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { useStore } from './src'

const App = () => {
  const [count, setCount] = useStore('counter', 0)
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
