import React from 'react';
import gql from 'gql-tag'; // editor helpe
import { query } from '@peajs/graphql-client';

export default class App extends React.Component {
  state = {
    data: '...',
  };
  async componentDidMount() {
    const USERS = gql`
      {
        userMany {
          _id
          name
        }
      }
    `;

    const endpoint = 'https://graphql-compose.herokuapp.com/user';

    const data = await query(endpoint, USERS, {});
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <h2>gql</h2>
        <pre className="App">{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}
