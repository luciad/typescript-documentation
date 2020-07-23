import React, { Component } from "react";
import BodySummary from "./body-summary"
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
            <Leaves data={data}/>
            </details>
      : <Leaves data={data}/>}
    </div>
  );
};

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
