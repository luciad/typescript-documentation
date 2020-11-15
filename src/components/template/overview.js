import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../page-layout"
import { fixModuleName, pathToModule } from "../../util/util"
import { sortModules } from "../../util/directory"
import { graphql } from "gatsby"
import Header from "./general/header"
import Text from "../body/general/text"

/**
 * List of all top-level modules
 *
 * Contains:
 * - List of links to all modules
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

    return (
      <div className="overview">
        <Header siteTitle="Module Overview" />
        <Layout>
          <div className="title">Module list</div>
          <FlatList modules={this.modules}/>
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
    //sort lines by replacement rules sorting
    this.modules = sortModules(this.modules)

    return (
      <div className="flat-module-list">
        <table>
          <tbody>
            {this.modules.map(module => (
              <tr key={"key_" + module.id + "module_entry_tr"}>
                <td key={"key_" + module.id + "module_entry_td"}>
                  <div className="sidecontainer" key={"key_" + module.id + "module_entry_div_sidecontainer"}>
                    <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
                  </div>
                </td>
                <td key={"key_" + module.id + "module_entry_td_comment"}>
                  {module.comment &&
                    <Text data={module.comment.shortText}/>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
