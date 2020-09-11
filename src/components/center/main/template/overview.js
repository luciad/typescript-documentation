import React, { Component } from "react";
import { Link } from "gatsby";
import Layout from "../../../page-layout";
import { fixModuleName, pathToModule } from "../../../../util/util";
import { graphql } from "gatsby";
import Icon from "../../../general/icon"
import Header from "../../../general/header"
import DirectoryList from "../general/directory-tree/directory-list"
import Text from "../general/text"

/**
 * List of all top-level modules
 *
 * Contains:
 * - List of links to all modules and their kindString icons
 */
class Overview extends Component {
  constructor(props){
    super(props)
    this.data = props.data
    this.state = {
      listType: "flat"
    }
  }

  render(){
    if(!this.data) return null
    this.modules = this.data.allModule.edges.map(edge => edge.node);

    this.setListFlat = () =>
      this.setState({
        listType: "flat"
      })

      this.setListTree = () =>
      this.setState({
        listType: "tree"
      })

    return (
      <div className="overview">
        <Header siteTitle="Module Overview" />
        <Layout>
          <div className="title">Module list</div>
          <button className="flat-button" onClick={this.setListFlat}>flat</button>
          <button className="tree-button" onClick={this.setListTree}>tree</button>
          {this.state.listType === "flat" &&
            <FlatList modules={this.modules}/>}
          {this.state.listType === "tree" &&
            <TreeList/>}
        </Layout>
      </div>
    );
  }
}
export default Overview

class FlatList extends Component {
  constructor(props){
    super(props)
    this.modules = props.modules
  }

  render(){
    return (
      <div className="flat-module-list">
        <table>
          {this.modules.map(module => (
            <tr key={module.id + "module_entry"}>
              <td>
                <div className="sidecontainer">
                  <Icon kindString={module.kindString}/>
                  <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
                </div>
              </td>
              <td>
                {module.comment &&
                  <Text data={module.comment.shortText}/>}
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

class TreeList extends Component {
  render(){
    return(
      <div className="tree-module-list">
        <DirectoryList/>
      </div>
    )
  }
}

export const query = graphql`
  query AllModulesQuery {
    allModule {
      edges {
        node {
        ...moduleFields
        }
      }
    }
  }
`;
