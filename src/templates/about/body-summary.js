import React from "react";
import { getComments } from "../../util/util"
import ChildrenSummary from "./children-summary"
import Flags from "./flags"
import Signatures from "./signatures"
import Links from "./links"
import Text from "./text"

export default ({ data }) => {
  const comments = getComments(data)
  
  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []
  return (
    <div>
      <br/>
      {comments.returns.length > 0 && 
        <div>returns {comments.returns}</div>}
      {(data.defaultValue !== null && data.defaultValue !== undefined) &&
        <div>Default value: {data.defaultValue}</div>}
      <Links data={data}/>
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <div className="subtitle">About</div>}
      <div className="shortText">
        <Text data={comments.shortText}/>
      </div>
      
        <Text data={comments.text}/>
      
        {comments.tags.length !== 0 && 
          <div className="subsubtitle">Tags</div>}
      <ul>
        {comments.tags.map(tag => (
          <li>{tag.tag}:<Text data={tag.text}/></li>
        ))}
      </ul>
      <Signatures data={data}/>
      <Flags data={data}/>
      <ChildrenSummary data={data}/>
    </div>
  );
};
