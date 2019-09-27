import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { request } from '../src'

class App extends React.Component {
  state = {
    data: '...',
  }
  async componentDidMount() {
    const data = await request('https://jsonplaceholder.typicode.com/todos/:id', {
      query: {
        foo: 'bar',
      },
      params: {
        id: 1,
      },
    })
    console.log('data:', data)
    this.setState({ data })
  }

  render() {
    return <pre className="App">{JSON.stringify(this.state.data, null, 2)}</pre>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
