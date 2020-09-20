import React, { Component } from "react";
import BodySummary from "./body-summary"
import SearchLink from "../search-link"
import Text from "../text"
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
      ?   <Expansion data={data}/>
      : <Leaves data={data}/>}
    </div>
  );
};

class Expansion extends Component {
  render() {
    const data=this.props.data
    const children = data.children
    if(!children || children.length === 0 || !data.groups) return null

    return(
      <>
      <hr/>
      {data.groups.map(group => (
        <div className="table-group" key={group.title + "_" + group.children.size}>
          <br/>
          <div className="subtitle">{group.title}</div>
          <table>
            {group.children.map(childID => {
              const child = children.find(child => (child.id == childID))
              return (
                <tr>
                  <td>
                    <SearchLink data={{text: child.name, id: child.id}}/>
                  </td>
                  <td>
                    {child.comment &&
                      <Text data={child.comment.shortText}/>}
                  </td>
                </tr>
              )})}
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
        <div className="leaf-group" key={group.title + "_" + group.children.size}>
          <div className="subtitle">{group.title}</div>
          {group.children.map(childID => {
                  const child = children.find(child => (child.id == childID))
                  return (
                    <Leaf data={child} key={child.id}/>
                  )
          })}
        </div>
      ))}
    </>
    )
  }
}
