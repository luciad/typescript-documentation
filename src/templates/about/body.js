import React from "react";
import BodySummary from "./body-summary"
import Leaf from "./leaf"

export default ({ data }) => {
  
  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []

  return (
    <div>
      <BodySummary data={data}/>
      {children.map(child => (
        <Leaf data={child}/>
      ))}

    </div>
  );
};
