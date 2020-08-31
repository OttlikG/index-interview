import React, { Component } from 'react';
import SearchTree from './SearchTree'
import IndexTree from './IndexTree'

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://api.index.hu/folders/folders/index.hu', {
      headers: {
        Authorization: '85IsCGestuf5B6WdaPC6QJl8v94tQuDjwEFqUCt4pp0EeqBJH'
      }
    }).then(response => response.json())
    .then(data => {
      console.log('-- data', data)
      this.setState({ data: data.data })
    })
  }

  render () {
    const { data } = this.state
    return (
      <div className="App">
        <IndexTree data={data} />
      </div>
    );
  }
}

export default App;
