import React from 'react'
import { Tree } from 'antd';
import { Input } from 'antd'

import 'antd/dist/antd.css';

const { Search } = Input

class IndexTree extends React.Component {

  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true
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
    const { value } = e.target

    setTimeout(() => this.getExpandedElement(value), 0)

    this.setState({
      searchValue: value,
      autoExpandParent: true,
    })
  }

  getExpandedElement = (value) => {
    const { data } = this.props

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

    this.setState({
      expandedKeys: searchedKey,
    })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  render() {
    const { data } = this.props
    const { autoExpandParent, expandedKeys, searchValue } = this.state

    const treeData = this.constructTree(data)

    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            path: item.path,
            children: loop(item.children)
          };
        }

        return {
          title,
          path: item.path,
          key: item.key,
        };
      });

    return (
      <div className="index-tree">
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          onSelect={this.onNodeSelected}
          autoExpandParent={autoExpandParent}
          expandedKeys={expandedKeys}
          treeData={loop(treeData)}
        />
      </div>
    );
  }
}

export default IndexTree