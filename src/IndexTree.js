import React from 'react'
import { Tree } from 'antd';
import { Input } from 'antd'

import 'antd/dist/antd.css';

const { Search } = Input

class IndexTree extends React.Component {

  state = {
    autoExpandParent: true,
    expandedKeys: []
  }

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
    this.props.setIframeUrl(e.node.path)
  }

  onChange = (e) => {
    const { data } = this.props
    const { value } = e.target
    
    function findSearchMatch(tree) {
      let matchedNode = []
      debugger;

      tree.forEach((item) => {
        if (item.title.indexOf(value) != -1) {
          matchedNode.push(item.key)
        } else {
          matchedNode = [
            ...matchedNode,
            ...findSearchMatch(item.children) 
          ]
        }
      })

      return matchedNode
    }

    const treeData = this.constructTree(data)
    const searchedKey = findSearchMatch(treeData)

    this.setState({ expandedKeys: searchedKey })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  render() {
    const { data } = this.props
    const { autoExpandParent, expandedKeys } = this.state

    const treeData = this.constructTree(data)

    return (
      <div className="index-tree">
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          onSelect={this.onNodeSelected}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          expandedKeys={expandedKeys}
        />
      </div>
    );
  }
}

export default IndexTree