import React from "react";
import BodySummary from "./body-summary"
import Leaf from "../body/children/leaf"

/**
 * Full body of an object
 * Contains:
 * - body summary (see body-summary.js)
 * - leaf of each child (see leaf.js)
 */
export default ({ data }) => {
  if(!data) return null

  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []
  return (
    <div>
      <BodySummary data={data}/>
      {children.map(child => (
        <Leaf data={child} key={child.id}/>
      ))}
    </div>
  );
};
