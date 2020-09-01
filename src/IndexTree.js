import React from 'react'
import { Tree } from 'antd';

import 'antd/dist/antd.css';

class IndexTree extends React.Component {

  constructTree (data) {
    const obj = data.map(node => {
      return {
        title: node.cim,
        key: node.folderId,
        path: node.path,
        children: this.constructTree(node.children)
      }
    })

    return obj
  }

  onNodeSelected = (node, e) => {
    console.log('-- node', e.node.path)
    this.props.setIframeUrl(e.node.path)
  }

  render() {
    const { data } = this.props

    const treeData = this.constructTree(data)

    return (
      <div className="index-tree">
        <Tree
          treeData={treeData}
          onSelect={this.onNodeSelected}
        />
      </div>
    );
  }
}

export default IndexTree