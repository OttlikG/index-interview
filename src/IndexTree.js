import React from 'react'
import { Tree } from 'antd';

import 'antd/dist/antd.css';

class IndexTree extends React.Component {

  constructTree (data) {
    const obj = data.map(node => {
      return {
        title: node.cim,
        key: node.folderId,
        children: this.constructTree(node.children)
      }
    })

    return obj
  }

  render() {
    const { data } = this.props

    const treeData = this.constructTree(data)

    return (
      <div>
        <Tree
          treeData={treeData}
        />
      </div>
    );
  }
}

export default IndexTree