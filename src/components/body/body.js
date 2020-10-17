import React, { Component } from "react";
import BodySummary from "./body-summary"
import SearchLink from "./general/search-link"
import Text from "./general/text"
import Leaf from "../body/children/leaf"

/**
 * Full body of an object
 * Contains:
 * - body summary (see body-summary.js)
 * - leaf of each child (see leaf.js)
 */
export default ({ data, shortListOnly }) => {
  if(!data) return null

  return (
    <div className="body">
      <BodySummary data={data} noChildrenSummary={shortListOnly}/>
      {shortListOnly
      ?   <ShortList data={data}/>
      : <Leaves data={data}/>}
    </div>
  );
};

class ShortList extends Component {
  render() {
    const data=this.props.data
    const children = data.children
    if(!children || children.length === 0 || !data.groups) return null

    return(
      <>
      <hr/>
      {data.groups.map(group => (
        <div className="table-group" key={"key_" + group.title + "_" + group.children.size + "_table-group"}>
          <br/>
          <div className="subtitle">{group.title}</div>
          <table>
            <tbody>
              {group.children.map(childID => {
                const child = children.find(child => (child.id == childID))
                return (
                  <tr key={"key_" + child.id + "_" + group.title + "_tr"}>
                    <td key={"key_" + child.id + "_" + group.title + "_td_link"}>
                      <SearchLink data={{text: child.name, id: child.id}}/>
                    </td>
                    <td key={"key_" + child.id + "_" + group.title + "_td_comment"}>
                      {child.comment &&
                        <Text data={child.comment.shortText}/>}
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      ))}
    </>
    )
  }
}

class Leaves extends Component {
  render() {
    const data=this.props.data
    const children = data.children
    if(!children || children.length === 0 || !data.groups) return null

    return(
      <>
      <hr/>
      {data.groups.map(group => (
        <div className="leaf-group" key={"key_" + group.title + "_" + group.children.size + "_group"}>
          <div className="subtitle">{group.title}</div>
          {group.children.map(childID => {
                  const child = children.find(child => (child.id == childID))
                  return (
                    <Leaf data={child} key={"key_" + child.id + "_leaf"}/>
                  )
          })}
        </div>
      ))}
    </>
    )
  }
}
