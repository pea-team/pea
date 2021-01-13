import React from 'react';

import { request } from '@peajs/request';

export default class App extends React.Component {
  state = {};
  async componentDidMount() {
    const data = await request(
      'https://jsonplaceholder.typicode.com/todos/:id',
      { params: { id: 1 } },
    );
    console.log('data:', data);
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <pre className="App">{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
