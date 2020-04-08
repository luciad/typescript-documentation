import React from "react";
import { getComments } from "../util/util"
import ChildrenSummary from "./children-summary"
import Leaf from "./leaf"
import ExportSummary from "./export-summary"
import Flags from "./flags"
import Signatures from "./signatures"

export default ({ data }) => {
  const comments = getComments(data)
  
  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []
  

  return (
    <div>
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <div className="subtitle">About</div>}
      <div className="shortText">
        {comments.shortText}
      </div>
      <p>
        {comments.text}
      </p>
        {comments.tags.length !== 0 && 
          <div className="subsubtitle">Tags</div>}
      <ul>
        {comments.tags.map(tag => (
          <li>{tag.tag}:{tag.text}</li>
        ))}
      </ul>
      <Signatures data={data}/>
      <Flags data={data}/>
      <ChildrenSummary data={data}/>
      <ExportSummary data={data}/>

      {children.map(child => (
        <Leaf data={child}/>
      ))}

    </div>
  );
};
