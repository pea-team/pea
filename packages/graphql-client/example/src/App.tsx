import React, { Component } from 'react'

import { query, GraphQLClient } from './src'
import gql from 'gql-tag' // editor helper

class App extends Component {
  state = {
    data: '...',
  }
  async componentDidMount() {
    const GET_PERSONS = gql`
      {
        allPersons {
          id
          name
        }
      }
    `

    const endpoint = 'https://api.graph.cool/simple/v1/swapi'

    const client = new GraphQLClient({ endpoint })
    client.query(GET_PERSONS, {}, { headers: { for: 'signer' } })

    const data = await query(endpoint, GET_PERSONS, {}, { headers: { Auto: 'bar' } })
    this.setState({ data })
  }

  render() {
    return <pre className="App">{JSON.stringify(this.state.data, null, 2)}</pre>
  }
}

export default App
