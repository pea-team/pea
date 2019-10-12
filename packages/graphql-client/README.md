# @peajs/graphql-client

> A light weight GraphQL GraphQLClient

## Installation

```sh
npm i @peajs/graphql-client
```

## Quick start

```js
import { query } from '@peajs/graphql-client'
import gql from 'gql-tag' // editor helper

const GET_PERSONS = gql`
  {
    allPersons {
      id
      name
    }
  }
`

const endpoint = 'https://api.graph.cool/simple/v1/swapi'

const data = await query(endpoint, GET_PERSONS)
```

## Use Client

```js
import { GraphQLClient } from '@peajs/graphql-client'
import { gql } from 'gql-tag' // editor helper

const GET_PERSONS = gql`
  {
    allPersons {
      id
      name
    }
  }
`
const GraphQLClient = new GraphQLClient({
  endpoint: 'https://api.graph.cool/simple/v1/swapi',
})

const data = await GraphQLClient.query(GET_PERSONS)
```

## Variables

```js
const GET_PERSON = gql`
  query getPerson($id: ID) {
    Person(id: $id) {
      id
      name
    }
  }
`

const data = await query(endpoint, GET_PERSON, {
  id: 'cj0nv9peiewhf013011i9a4h2',
})
```

## Typescript

```js
interface Person {
  Person: {
    id: string
    name: string
  }
}

const GET_PERSON = gql`
  query getPerson($id: ID) {
    Person(id: $id) {
      id
      name
    }
  }
`

const data = await query<Person>(endpoint, GET_PERSON, {
  id: 'cj0nv9peiewhf013011i9a4h2',
})
```

## License

[MIT License](https://github.com/pea-team/pea/blob/master/LICENSE)
