import React, { useState, useEffect } from 'react'
import gql from 'gql-tag'
import { createStore, observe } from 'dahlia-store'

import {
  config,
  query,
  useQuery,
  useMutate,
  fetcher,
  useSubscribe,
  fromSubscription,
} from '../../src'

function handleResponse(result: any) {
  if (typeof result !== 'object') return result
  if (Object.keys(result).length === 1) {
    return result[Object.keys(result)[0]]
  }
  return result
}

function setToken(config: any) {
  config.headers = {
    ...config.headers,
    Authorization: `bearer token...`,
  }
  return config
}

config({
  // endpoint: 'http://localhost:7001/graphql',
  endpoint: 'https://graphql-compose.herokuapp.com/user',
  subscriptionsEndpoint: 'ws://localhost:7001/graphql',
  interceptor: {
    responses: [handleResponse],
    requests: [setToken],
  },
})

const GET_USER = gql`
  query User {
    userOne {
      _id
      name
      gender
      age
    }
  }
`

const GET_USER_BY_ID = gql`
  query User($_id: MongoID!) {
    userById(_id: $_id) {
      _id
      name
      gender
      age
    }
  }
`

const SUB = gql`
  subscription notice {
    normalSubscription {
      id
      date
      message
    }
  }
`

const GET_NOTICE = gql`
  {
    notification {
      id
      message
      date
    }
  }
`

fromSubscription(SUB).subscribe({
  next(data: any) {
    console.log('data:', data)
  },
})

const SubApp = () => {
  const { data = {} } = useSubscribe(SUB, {
    initialQuery: {
      query: GET_NOTICE,
    },
  })
  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const QueryApp = () => {
  const [data, setData] = useState()
  useEffect(() => {
    async function queryData() {
      const res = await query(GET_USER)
      setData(res)
    }
    queryData()
  }, [])

  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const UseQueryApp = () => {
  const { loading, data, error, refetch } = useQuery(GET_USER)

  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div className="App">
      <button onClick={() => refetch()}>refetch</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const store = createStore({
  _id: '57bb44dd21d2befb7ca3f002',
  setId() {
    store._id = '57bb44dd21d2befb7ca3f004'
  },
})

// setTimeout(() => {
//   store.setId()
// }, 2000)

const UseQueryById = observe(() => {
  const { loading, data, error, refetch } = useQuery<any>(GET_USER_BY_ID, {
    name: 'getUserById',
    variables: { _id: store._id },
    deps: [store._id],
  })

  console.log('render....')
  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div className="App">
      <button onClick={() => refetch({ variables: { _id: '57bb44dd21d2befb7ca3f004' } })}>
        refetch
      </button>
      <button
        onClick={() =>
          fetcher.getUserById.refetch({ variables: { _id: '57bb44dd21d2befb7ca3f004' } })
        }
      >
        refetch with fetcher
      </button>
      <div>
        <div>name: {data.name}</div>
        <div>age: {data.age}</div>
      </div>
    </div>
  )
})

const UseMutateApp = () => {
  const [addTodo, { loading, data, error }] = useMutate(GET_USER)

  return (
    <div className="App">
      <button onClick={() => addTodo({})}>
        {loading === undefined && 'Add Todo'}
        {loading !== undefined && (loading ? 'loading...' : ' Added')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default () => (
  <div>
    <SubApp></SubApp>
    <QueryApp />
    <UseQueryById />
    <UseQueryApp />
    <UseMutateApp />
  </div>
)
