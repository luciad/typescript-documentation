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
export default ({ data, requireExpand }) => {
  if(!data) return null

  return (
    <div className="body">
      <BodySummary data={data}/>
      {requireExpand
      ?   <details>
              <summary>
                Expand children
              </summary>
            <Expansion data={data}/>
            </details>
      : <Leaves data={data}/>}
    </div>
  );
};

class Expansion extends Component {
  render() {
    const data=this.props.data
    if(!data.children) return null

    return (
      <table>
        {data.children.map(child => (
          <tr>
            <td>
              <SearchLink data={{text: child.name, id: child.id}}/>
            </td>
            <td>
              {child.comment &&
                <Text data={child.comment.shortText}/>}
            </td>
          </tr>
        ))}
      </table>
    )
  }
}

class Leaves extends Component {
  render() {
    const data=this.props.data
    if(!data.children) return null

    return (
      data.children.map(child => (
        <Leaf data={child} key={child.id}/>
      ))
    )
  }
}
