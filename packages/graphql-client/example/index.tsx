import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import gql from 'gql-tag' // editor helpe
// import tag from 'graphql-tag' // editor helpe
import { query, GraphQLClient } from '../src'

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    upload(file: $file)
  }
`

const FIELD_UPLOAD_MUTATION = gql`
  mutation($input: UploadInput!) {
    uploadWithField(input: $input)
  }
`

const USER = gql`
  {
    users {
      age
      name
    }
  }
`

const Upload = () => {
  let [fileList, setFiles] = React.useState<FileList | null>()

  async function click() {
    if (!fileList) return
    console.log('files:', fileList)
    try {
      const data = await query(
        // 'http://localhost:8080/graphql',
        'http://localhost:5001/graphql',
        // SINGLE_UPLOAD_MUTATION,
        // FIELD_UPLOAD_MUTATION,
        USER,
        // {
        //   file: fileList[0],
        // },
        // {
        //   input: {
        //     desc: 'hahaha',
        //     file: fileList[0],
        //   },
        // },
      )
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={e => setFiles(e.target.files)} />
      <div></div>
      <button onClick={() => click()}>uploade</button>
    </div>
  )
}

class App extends React.Component {
  state = {
    data: '...',
  }
  async xcomponentDidMount() {
    const GET_PERSONS = gql`
      {
        users {
          age
          name
        }
      }
    `

    const endpoint = 'http://127.0.0.1:5001/graphql'

    const client = new GraphQLClient(endpoint)
    // client.query(GET_PERSONS, {}, { headers: { for: 'signer' }, type: 'formData' })

    const data = await query(
      endpoint,
      GET_PERSONS,
      {},
      {
        type: 'formData',
      },
    )
    this.setState({ data })
  }

  render() {
    return (
      <div>
        <pre className="App">{JSON.stringify(this.state.data, null, 2)}</pre>
        <Upload></Upload>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
