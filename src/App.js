import React, { Component } from 'react';

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
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
