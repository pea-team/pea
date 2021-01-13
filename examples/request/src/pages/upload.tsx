import React from 'react';

import { request } from '@peajs/request';

const Upload = () => {
  let [files, setFiles] = React.useState<FileList | null>();
  console.log('files:', files);

  async function click() {
    if (!files) return;
    const file = files[0];
    console.log('file:', file);
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append('name', 'bar');
    console.log('formData:', formData);

    const data = await request('http://localhost:7001/form', {
      method: 'POST',
      body: formData,
      headers: {
        // 'content-type': 'multipart/form-data',
      },
      type: 'formData',
    });
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <div></div>
      <button onClick={() => click()}>uploade</button>
    </div>
  );
};

export default class App extends React.Component {
  state = {
    data: '...',
  };
  async componentDidMount() {
    const data = await request(
      'https://jsonplaceholder.typicode.com/todos/:id',
      {
        query: {
          // foo: 'bar',
        },
        params: {
          id: 1,
        },
        method: 'POST',
        body: {
          a: 'a',
        },
        headers: {
          'content-type': 'multipart/form-data',
        },
        type: 'formData',
      },
    );
    console.log('data:', data);
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <Upload></Upload>
        <pre className="App">{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}
