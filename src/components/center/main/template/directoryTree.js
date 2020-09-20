import React, { Component } from "react";
import Layout from "../../../page-layout";
import Header from "../../../general/header"
import DirectoryList from "../general/directory-tree/directory-list"

/**
 * List of all top-level modules
 *
 * Contains:
 * - List of links to all modules and their kindString icons
 */
class Overview extends Component {
  constructor(props){
    super(props)
    this.path = props.path
  }

  render(){
    return (
      <div className="overview">
        <Header siteTitle="Module Overview" />
        <Layout>
          <div className="title">Module list</div>
          <TreeList path={this.path}/>
        </Layout>
      </div>
    )
  }
}
export default Overview

class TreeList extends Component {
  constructor(props){
    super(props)
    this.path = props.path
  }

  render(){
    return(
      <div className="tree-module-list">
        <DirectoryList expand={this.path}/>
      </div>
    )
  }
}
