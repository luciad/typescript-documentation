import React from "react";
import { getComments } from "../../util/util"
import ChildrenSummary from "./children-summary"
import Leaf from "./leaf"
import Flags from "./flags"
import Signatures from "./signatures"
import Links from "./links"
import Parameters from "./parameters"

export default ({ data }) => {
  const comments = getComments(data)
  
  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []

  return (
    <div>
      {comments.returns.length > 0 && 
        <div>returns {comments.returns}</div>}
      <Links data={data}/>
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

      {children.map(child => (
        <Leaf data={child}/>
      ))}

    </div>
  );
};