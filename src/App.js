import React, { Component } from 'react';
import IndexTree from './IndexTree'

import './App.scss'

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      iframeUrl: ''
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

  setIframeUrl = (url) => {
    this.setState({ iframeUrl: url })
  }

  render () {
    const { data, iframeUrl } = this.state
    const iframeFullUrl = `https://index.hu/${iframeUrl}`

    return (
      <div className="app">
        <IndexTree data={data} setIframeUrl={this.setIframeUrl} />
        <div className="content">
          <iframe src={iframeFullUrl} width="1000" height="800" />
        </div>
      </div>
    );
  }
}

export default App;
